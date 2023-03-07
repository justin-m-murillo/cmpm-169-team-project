/*********************************** 
CMPM 169 TEAM PROJECT - CITY BUILDER

Contributors:
  Kenny Chau
  Justin Murillo
  Nathan Laureta
  Vincent Kurniadjaja

***********************************/
// Variables for Border
let radius = 100;
var isTheMousePressed = false;
var bordorPlaced = false;

// VARIABLES FOR BUILDINGS
// all max variables used for p5.random account for non-inclusiveness
let buildSizeWidthMin = 5;
let buildSizeWidthMax = 20;
//let buildSizeHeightMin = 20;
//let buildSizeHeightMax = 101;
// using same parameters for the x and y positions
let buildPosMin = (-radius/2) + 10;
let buildPosMax = (radius/2) - 10;

// Constants for Borders
let BUILDING_TIMER = 50;

// Array to store buildings
//let buildings = [];
let borderList = []

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
    fill(0);
    stroke(122);
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

  static getBuildingParams() {
    let buildWidth = floor(random(
      buildSizeWidthMin, 
      buildSizeWidthMax
    ));
    // let buildHeight = floor(random(
    //   buildSizeHeightMin, 
    //   buildSizeHeightMax
    // ));
    let xpos = floor(random(
      mouseX + buildPosMin,
      mouseX + buildPosMax
    ));
    let ypos = floor(random(
      mouseY + buildPosMin,
      mouseY + buildPosMax
    ));
    let buildParams = {
      x: xpos,
      y: ypos,
      w: buildWidth
      //h: buildHeight
    }
    return buildParams;
  }
}

class Bordor {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.maxRadius = this.radius + 100;
    this.buildings = []

    // Keeps track of adds a building per timer
    this.buildingTimer = BUILDING_TIMER
  }
  //update() {
        //Compare all city's radius with this and check
        //for each border in array
        //if(radius doesn't collide with other radius) {
            //Radius += growth
        //}
    //}
  
  // Adds a building to the border
  addBuilding() {
    let buildingSize = floor(random(buildSizeWidthMin, buildSizeWidthMax));
    let tempBuilding = new Building (this.x + random(-this.radius/2, this.radius/2), this.y + random(-this.radius/2, this.radius/2), buildingSize, buildingSize * 4);
    this.buildings.push(tempBuilding);
    this.buildings.sort((a,b) => a.y - b.y);
  }

  draw() {
    stroke(0);
    noFill()
    ellipse(this.x, this.y, this.radius)
    /*
    if (isTheMousePressed && bordorPlaced == false) {
      noFill()
      ellipse(this.x, this.y, this.radius)
      bordorPlaced = true
    } */
    for (let i = 0; i < this.buildings.length; i++) {
      this.buildings[i].draw();
      print(true)
    }

    if (this.buildingTimer > 0) {
      this.buildingTimer -= 1;
    } else {
      this.addBuilding();
      this.buildingTimer = BUILDING_TIMER;
    }

    this.growBorder();
  }

  growBorder() {
    if (this.radius < this.maxRadius) {
      this.radius += 0.5;
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  /*
  for (let i = 0; i < buildings.length; i++) {
    buildings[i].draw();
  }*/
  for (let i = 0; i < borderList.length; i++) {
    borderList[i].draw();
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
  //isTheMousePressed = true;
  /*
  for (let i = 0; i < floor(random(4, 8)); i++) {
    let buildParams = Building.getBuildingParams();
    console.log(`(${buildParams.x}, ${buildParams.y}) ${buildParams.w} ${buildParams.w * 4}`);
    buildings.push(new Building(buildParams.x, buildParams.y, buildParams.w, buildParams.w * 4));
  }
  buildings.sort((a,b) => a.y - b.y);*/
  let tempBorder = new Bordor(mouseX, mouseY, radius);
  borderList.push(tempBorder);
}

/*
function mouseReleased() {
  isTheMousePressed = false;
  bordorPlaced = false;
}*/