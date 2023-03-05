/*********************************** 
CMPM 169 TEAM PROJECT - CITY BUILDER

Contributors:
  Kenny Chau
  Justin Murillo
  Nathan Laureta
  Vincent Kurniadjaja

***********************************/
let test;

class Building {
  constructor (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw() {
    rect(this.x, this.y, this.width, this.height)
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  test = new Building(width/2, height/2, 100, 400);
}

function draw() {
  background(220);
  test.draw();
}
