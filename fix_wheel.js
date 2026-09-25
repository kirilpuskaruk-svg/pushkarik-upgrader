const fs = require('fs');
let c = fs.readFileSync('app.js', 'utf8');

const target1 = `  draw() {
    const ctx = this.ctx;
    const center = this.center;
    const radius = this.radius;

    ctx.clearRect(0, 0, this.size, this.size);

    // Track ring
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 14;
    ctx.stroke();

    const chance = state.calculateChance();
    const chanceAngle = (chance / 100) * 360;

    // Winning Arc
    if (chance > 0) {
      let startDeg, endDeg;
      if (state.rollDirection === 'under') {
        startDeg = -90;
        endDeg = -90 + chanceAngle;
      } else {
        startDeg = -90 + (360 - chanceAngle);
        endDeg = 270;
      }

      const startRad = (startDeg * Math.PI) / 180;
      const endRad = (endDeg * Math.PI) / 180;

      ctx.save();
      ctx.beginPath();
      ctx.arc(center, center, radius, startRad, endRad);
      const grad = ctx.createLinearGradient(0, 0, this.size, this.size);
      grad.addColorStop(0, '#00ff88');
      grad.addColorStop(0.5, '#00f0ff');
      grad.addColorStop(1, '#b026ff');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(0, 240, 255, 0.6)';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.restore();
    }

    // Ticks
    const numTicks = 60;
    for (let i = 0; i < numTicks; i++) {
      const angle = (i * 360 / numTicks - 90) * (Math.PI / 180);
      const tickInner = radius + 11;
      const tickOuter = tickInner + (i % 5 === 0 ? 6 : 3);
      ctx.beginPath();
      ctx.moveTo(center + Math.cos(angle) * tickInner, center + Math.sin(angle) * tickInner);
      ctx.lineTo(center + Math.cos(angle) * tickOuter, center + Math.sin(angle) * tickOuter);
      ctx.strokeStyle = i % 5 === 0 ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    this.drawNeedle(this.currentAngle);
  }`;

const target2 = target1.replace(/\n/g, '\r\n');

const replacement = `  draw() {
    const ctx = this.ctx;
    const center = this.center;
    const radius = this.radius;

    ctx.clearRect(0, 0, this.size, this.size);

    ctx.save();
    // Rotate the entire ring counter-clockwise by currentAngle
    ctx.translate(center, center);
    ctx.rotate(-this.currentAngle * Math.PI / 180);
    ctx.translate(-center, -center);

    // Track ring
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 14;
    ctx.stroke();

    const chance = state.calculateChance();
    const chanceAngle = (chance / 100) * 360;

    // Winning Arc
    if (chance > 0) {
      let startDeg, endDeg;
      if (state.rollDirection === 'under') {
        startDeg = -90;
        endDeg = -90 + chanceAngle;
      } else {
        startDeg = -90 + (360 - chanceAngle);
        endDeg = 270;
      }

      const startRad = (startDeg * Math.PI) / 180;
      const endRad = (endDeg * Math.PI) / 180;

      ctx.save();
      ctx.beginPath();
      ctx.arc(center, center, radius, startRad, endRad);
      const grad = ctx.createLinearGradient(0, 0, this.size, this.size);
      grad.addColorStop(0, '#00ff88');
      grad.addColorStop(0.5, '#00f0ff');
      grad.addColorStop(1, '#b026ff');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 14;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(0, 240, 255, 0.6)';
      ctx.shadowBlur = 15;
      ctx.stroke();
      ctx.restore();
    }

    // Ticks
    const numTicks = 60;
    for (let i = 0; i < numTicks; i++) {
      const angle = (i * 360 / numTicks - 90) * (Math.PI / 180);
      const tickInner = radius + 11;
      const tickOuter = tickInner + (i % 5 === 0 ? 6 : 3);
      ctx.beginPath();
      ctx.moveTo(center + Math.cos(angle) * tickInner, center + Math.sin(angle) * tickInner);
      ctx.lineTo(center + Math.cos(angle) * tickOuter, center + Math.sin(angle) * tickOuter);
      ctx.strokeStyle = i % 5 === 0 ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    ctx.restore();

    // Draw static needle always pointing up (0 degrees logic for drawNeedle means top)
    this.drawNeedle(0); 
  }`;

if (c.includes(target1)) c = c.replace(target1, replacement);
else if (c.includes(target2)) c = c.replace(target2, replacement);
else console.log("TARGET NOT FOUND");

fs.writeFileSync('app.js', c);
