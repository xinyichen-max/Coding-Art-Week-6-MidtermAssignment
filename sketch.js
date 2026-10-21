
let movers = [];
let numMovers = 18;
let colorPal = [
  [105, 215, 250],
  [165, 235, 250],
  [255, 175, 215],
  [245, 200, 235],
  [190, 190, 250]
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 6; j++) {
      movers.push(new mover());
    }
  }
  background(5, 52, 92);
}

function draw() {
  background(5, 52, 92, 220);

  for (let i = 0; i < numMovers; i++) {
    movers[i].display();
    movers[i].update();
    movers[i].keepInCanvas();
  }
}

function mapSin(a, val1, val2) {
  return map(sin(a), -1, 1, val1, val2);
}

class mover {
  constructor() {
    let randCol = floor(random(colorPal.length));

    this.r = colorPal[randCol][0];
    this.g = colorPal[randCol][1];
    this.b = colorPal[randCol][2];
    this.x = random(width);
    this.y = random(height);
    this.xDir = random(-0.7, 0.7);
    this.yDir = random(-0.7, 0.7);
    this.d = random(40, 105);
    this.angle = random(360);
    this.rotSpeed = random(0.4, 1.2);
  }

  display() {
    let d = this.d * mapSin(this.angle, 0.9, 1.12);
    noStroke();

    fill(this.r, this.g, this.b, 12);
    circle(this.x, this.y, d * 1.2);

    for (let i = 2; i > 0; i--) {
      fill(this.r, this.g, this.b, 35);
      circle(this.x, this.y, d * i / 2);
    }

    noFill();
    stroke(this.r, this.g, this.b, 150);
    strokeWeight(1);
    circle(this.x, this.y, d);

    noStroke();
    fill(235, 245, 255, 100);
    circle(this.x, this.y, d * 0.1);

    for (let i = 0; i < 3; i++) {
      let a = this.angle + i * 120;
      let x = this.x + cos(a) * d * 0.65;
      let y = this.y + sin(a) * d * 0.65;

      fill(this.r, this.g, this.b, 180);
      circle(x, y, 3);
    }
  }

  update() {
    this.x += this.xDir;
    this.y += this.yDir;
    this.angle += this.rotSpeed;
  }

  keepInCanvas() {
    if ((this.x > width) || (this.x < 0)) {
      this.xDir = -this.xDir;
    }
    if ((this.y > height) || (this.y < 0)) {
      this.yDir *= -1;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(5, 52, 92);
}
