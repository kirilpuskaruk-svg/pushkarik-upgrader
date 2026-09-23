const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav'
};

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(c => {
    const parts = c.split('=');
    if (parts.length >= 2) {
      cookies[parts[0].trim()] = decodeURIComponent(parts.slice(1).join('=').trim());
    }
  });
  return cookies;
}

const server = http.createServer(async (req, res) => {
  // CORS & basic headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  console.log(`[${req.method}] ${pathname}`);

  // Add Vercel-like response helpers
  res.status = function(code) {
    res.statusCode = code;
    return this;
  };
  res.json = function(data) {
    if (!res.getHeader('Content-Type')) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
    }
    return res.end(JSON.stringify(data));
  };
  res.send = function(data) {
    return res.end(data);
  };

  // Add request helpers
  req.query = Object.fromEntries(parsedUrl.searchParams);
  req.cookies = parseCookies(req.headers.cookie);

  // Read request body if present
  let bodyBuffer = Buffer.from([]);
  try {
    for await (const chunk of req) {
      bodyBuffer = Buffer.concat([bodyBuffer, chunk]);
    }
  } catch (err) {
    console.error('Error reading body:', err);
  }

  const contentType = (req.headers['content-type'] || '').toLowerCase();
  if (contentType.includes('application/json') && bodyBuffer.length > 0) {
    try {
      req.body = JSON.parse(bodyBuffer.toString('utf8'));
    } catch (e) {
      req.body = {};
    }
  } else {
    req.body = bodyBuffer.toString('utf8');
  }

  // Route 1: API Endpoints (/api/...)
  if (pathname.startsWith('/api/')) {
    const apiRelPath = pathname.replace(/^\/api\//, '');
    const possiblePaths = [
      path.join(ROOT_DIR, 'api', `${apiRelPath}.js`),
      path.join(ROOT_DIR, 'api', apiRelPath, 'index.js'),
      path.join(ROOT_DIR, 'api', apiRelPath)
    ];

    let handlerFile = possiblePaths.find(p => fs.existsSync(p) && fs.statSync(p).isFile());

    if (handlerFile) {
      try {
        // Clear require cache for development hot-reloading
        delete require.cache[require.resolve(handlerFile)];
        const handler = require(handlerFile);
        if (typeof handler === 'function') {
          return await handler(req, res);
        } else if (handler && typeof handler.default === 'function') {
          return await handler.default(req, res);
        }
      } catch (err) {
        console.error(`API execution error [${pathname}]:`, err);
        return res.status(500).json({ error: err.message || 'Internal API Error' });
      }
    }

    return res.status(404).json({ error: `API route ${pathname} not found` });
  }

  // Route 2: Static files
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') {
    safePath = '/index.html';
  }

  const filePath = path.join(ROOT_DIR, safePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME_TYPES[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', mime);
    return fs.createReadStream(filePath).pipe(res);
  }

  // Fallback to index.html for SPA if not found and not an asset
  const indexHtmlPath = path.join(ROOT_DIR, 'index.html');
  if (fs.existsSync(indexHtmlPath)) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return fs.createReadStream(indexHtmlPath).pipe(res);
  }

  res.statusCode = 404;
  res.end('Not Found');
});

server.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🚀 PUSHKARIK UPGRADER запущено локально!`);
  console.log(`🌐 Адреса у браузері: http://localhost:${PORT}`);
  console.log('====================================================');
});
