// Control all concentric circles with the same center and size.
class createMutipleCircle {
  constructor(centerX, centerY, centerSize, mainColor, secondaryColor) {
    this.x = centerX;
    this.y = centerY;
    this.size = centerSize;
    this.color1 = mainColor;
    this.color2 = secondaryColor;
  }

  // Draw the moon
  drawMoon() {
    noStroke();
    for (let j = 0; j < 3; j++) {
      if (j % 2 === 0) {
        fill(0);
      } else {
        fill(this.color1);
      }
      let smallMoon = this.size / 6;
      circle(this.x - (this.size / 2 - (this.size - j * smallMoon) / 2), this.y, this.size - j * smallMoon);
    }
  }

  // Line made of circles
  lineCircle() {
    for (let j = 0; j < 360 / 2; j++) {
      let lineCircleX1 = cos(j * 2) * this.size / 2 * 1.32 + this.x;
      let lineCircleX2 = sin(j * 2) * this.size / 2 * 1.32 + this.y;
      if (random() > 0.0176) {
        fill(this.color1);
        circle(lineCircleX1, lineCircleX2, this.size / 100);
      } else {
        fill(this.color1);
        circle(lineCircleX1, lineCircleX2, random(this.size / 25, this.size / 13));
      }
    }
  }

  // There is a circle of dots between two circular lines
  decorationCircle() {
    push();
    noStroke();
    noFill();
    let zhouSize = this.size * 1.075;
    circle(this.x, this.y, zhouSize);
    pop();

    push();
    strokeWeight(this.size / 200);
    stroke(this.color1);
    noFill();
    circle(this.x, this.y, zhouSize * 0.97);
    pop();

    push();
    strokeWeight(this.size / 200);
    stroke(this.color1);
    noFill();
    circle(this.x, this.y, zhouSize * 1.07);
    pop();

    for (let j = 0; j < 360 / 6; j++) {
      let zhouX1 = cos(j * 6) * zhouSize / 1.95 + this.x;
      let zhouY1 = sin(j * 6) * zhouSize / 1.95 + this.y;
      fill(this.color1);
      circle(zhouX1, zhouY1, this.size / 40);
    }
  }

  // Draw different triangles by angle control
  drawTriangle(d, rms) {
    noFill();
    stroke(255, 100);
    strokeWeight(this.size / 80);
    let sr = (this.size * 1.15) * 2;
    let starSize = random(this.size / 4, this.size / 3);

    beginShape();
    for (let j = 0; j < 4; j++) {
      let sx1 = cos(120 * j - d) * (sr / 2) + this.x;
      let sy1 = sin(120 * j - d) * (sr / 2) + this.y;
      vertex(sx1, sy1);

      // gradient circle
      push();
      let innerColor1 = color(this.color1);
      let outerColor1 = color(255, 0, 255, 30);
      for (let o = 0; o < 3; o++) {
        drawRadialGradientCircle(sx1, sy1, starSize / (o + 1) * rms * 5 / (j + 1), innerColor1, outerColor1);
      }
      pop();
    }
    endShape();
  }

  // Lines radiating from a circle
  drawLine(rms) {
    let drawLineDegree = 30;
    for (let j = 0; j < 12; j++) {
      for (let i = 0; i < 5; i++) {
        push();
        strokeWeight(this.size / 180);
        stroke(this.color2);
        let x1 = cos(drawLineDegree * j - 67.5 - i * random(12.5)) * this.size * rms * 17 + this.x;
        let y1 = sin(drawLineDegree * j - 67.5 - i * random(12.5)) * this.size * rms * 17 + this.y;
        line(this.x, this.y, x1, y1);
        pop();
      }
    }
    push();
    fill(0);
    noStroke();
    circle(this.x, this.y, this.size * 1.15);
    pop();
  }

  // The ordered points of the outermost circle
  diverPoint(spectrum) {
    for (let j = 0; j < spectrum.length; j++) {
      let diverPointDegree = 360 / spectrum.length;
      let amp = spectrum[j];
      let maxPoints = floor(map(amp, 0, 255, 3, 15));

      for (let i = 0; i < maxPoints; i++) {
        let c = map(i, 0, maxPoints - 1, 50, 25);
        push();
        noStroke();
        fill(amp, 255, 255);

        let pointR = this.size / 2.2;
        let diffusionR = max(((1.5 + amp / 255 * 1.2) * (1 - i * 0.05) * 2.5), 2.8);
        let diverPointAngle = diverPointDegree * j;
        let x1 = cos(diverPointAngle) * pointR * diffusionR + this.x;
        let y1 = sin(diverPointAngle) * pointR * diffusionR + this.y;

        let dotSize = pointR / c * (1 + amp / 255 * 0.5);
        circle(x1, y1, dotSize);
        pop();
      }
    }
  }

  // Draw random points
  randomPoint() {
    push();
    fill(this.color2);
    for (let j = 1; j < 25; j++) {
      for (let i = 0; i < 360; i += j / 10) {
        let dianR = map(j, 1, 100, this.size * 2.34 / 2, this.size / 2);
        let r = random(dianR, this.size * 2.34 / 2);
        let angle = random(0, i * 360 - j);
        let dianX = cos(angle) * r + this.x;
        let dianY = sin(angle) * r + this.y;
        noStroke();
        circle(dianX, dianY, random(this.size / 200, this.size / 40));
      }
    }
    pop();
  }
}
