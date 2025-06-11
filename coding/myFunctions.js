// Six gradient circles
function drawRadialGradientCircle(x, y, r, innerColor, outerColor) {
  for (let i = r; i > 0; i--) {
    let t = map(i, 0, r, 1, 0);
    let c = lerpColor(outerColor, innerColor, t);
    fill(c);
    noStroke();
    ellipse(x, y, i * 2, i * 2);
  }
}

// Meteor
let meteorLayer;
let meteorCount = 50;
let minLength = 15;
let maxLength = 40;
let minWeight = 0.5;
let maxWeight = 2;
let angleDeg = 145;

function drawMeteorLayer() {
  meteorLayer.clear();
  meteorLayer.noStroke();

  for (let i = 0; i < meteorCount; i++) {
    let x = random(width);
    let y = random(height);
    let len = random(minLength, maxLength);
    let weight = random(minWeight, maxWeight);

    let localAngle = angleDeg + random(-5, 5);
    let angleRad = radians(localAngle);

    meteorLayer.push();
    meteorLayer.translate(x, y);
    meteorLayer.rotate(angleRad);

    // Meteor head
    meteorLayer.fill(255, 200);
    meteorLayer.ellipse(0, 0, weight * 1.5);

    // Meteor tail
    for (let j = 0; j < len; j++) {
      let tail = map(j, 0, len, 180, 20);
      meteorLayer.fill(255, tail);
      meteorLayer.ellipse(j * 0.3, j, weight);
    }

    meteorLayer.pop();
  }
}

// Draw star by ‘shape’
function drawStar(starX, starY, starSize, changeD) {
  noStroke();
  for (let j = 0; j < 3; j++) {
    let r = map(j, 0, 2, starSize, starSize / 3);
    if (j % 2 !== 0) {
      fill(0);
    } else {
      fill(222, 0, random(150, 255));
    }

    beginShape();
    for (let i = 0; i <= 8; i++) {
      let a;
      if (i === 0 || i === 4 || i === 8) {
        a = starSize / 3;
      } else {
        a = 0;
      }

      let bigStarX = cos(starDegree * i - 90 - changeD) * (r + a) * 3 / 2 + starX;
      let bigStarY = sin(starDegree * i - 90 - changeD) * (r + a) * 3 / 2 + starY;
      let circleX = cos(starDegree * i - 90 - changeD) * (starSize + a) * 1.7 + starX;
      let circleY = sin(starDegree * i - 90 - changeD) * (starSize + a) * 1.7 + starY;

      let smallStarX = cos(starDegree * i - 67.5 - changeD) * r / 3 + starX;
      let smallStarY = sin(starDegree * i - 67.5 - changeD) * r / 3 + starY;

      vertex(bigStarX, bigStarY);
      vertex(smallStarX, smallStarY);

      if (starSize / 9 < width / 300) {
        circle(circleX, circleY, starSize / 9);
      }
    }
    endShape();
  }
}
