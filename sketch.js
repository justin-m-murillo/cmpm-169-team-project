/*********************************** 
CMPM 169 TEAM PROJECT - CITY BUILDER

Contributors:
  Kenny Chau
  Justin Murillo
  Nathan Laureta
  Vincent Kurniadjaja

***********************************/
// test variables
// test variables
let testB;
let test;

// Variables for Border
let radius = 50;
var isTheMousePressed = false;
var bordorPlaced = false;

// Array to store buildings
let buildings = [];

// Created by Vincent, represents a single building
class Building {
  // Creates a building at x, y with max width and max height
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.maxWidth = width
    this.curWidth = 0;
    this.maxHeight = height;
    this.curHeight = 0;
  }

  draw() {
    rect(this.x - this.curWidth / 2, this.y - this.curHeight, this.curWidth, this.curHeight)
    this.tweenBuilding();
  }

  // This code will grow the building
  tweenBuilding() {
    let heightRate = this.maxHeight / 100
    let widthRate = this.maxWidth / 100
    if (this.curHeight < this.maxHeight) {
      this.curHeight += heightRate;
    }

    if (this.curWidth < this.maxWidth) {
      this.curWidth += widthRate
    }
  }
}

class Bordor {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  //update() {
        //Compare all city's radius with this and check
        //for each border in array
        //if(radius doesn't collide with other radius) {
            //Radius += growth
        //}
    //}
  draw() {
    stroke(255);
    if (isTheMousePressed && bordorPlaced == false) {
      fill(0)
      ellipse(this.x, this.y, this.radius)
      bordorPlaced = true
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  //background(220);
  for (let i = 0; i < buildings.length; i++) {
    buildings[i].draw();
  }
  if (test) {
    test.draw();
  }
}

function keyPressed() {
  if (key == "1") {
    radius = 50;
  }
  if (key == "2") {
    radius = 100;
  }
  if (key == "3") {
    radius = 150;
  }
}

function mousePressed() {
  isTheMousePressed = true;
  buildings.push(new Building(mouseX, mouseY, 100, 400));
  test = new Bordor(mouseX, mouseY, radius);
}

function mouseReleased() {
  isTheMousePressed = false;
  bordorPlaced = false;
}