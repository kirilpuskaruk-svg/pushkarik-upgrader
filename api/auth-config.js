module.exports = function handler(req, res) {
  res.status(200).setHeader('Cache-Control', 'no-store').json({
    googleClientId: process.env.GOOGLE_CLIENT_ID || ''
  });
};
