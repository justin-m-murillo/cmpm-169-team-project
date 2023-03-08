/*********************************** 
CMPM 169 TEAM PROJECT - CITY BUILDER

Contributors:
  Kenny Chau
  Justin Murillo
  Nathan Laureta
  Vincent Kurniadjaja

***********************************/
// Variables for Border
var isTheMousePressed = false;
var borderPlaced = false;
let borderGrowthSpeed = 0.1;
let d
let radius

let mouseX1
let mouseY1
let mouseX2
let mouseY2

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
let buildings = [];
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
      mouseX1 + buildPosMin,
      mouseX1 + buildPosMax
    ));
    let ypos = floor(random(
      mouseY1 + buildPosMin,
      mouseY1 + buildPosMax
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

class Border {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.maxRadius = this.radius + 100;
    this.buildings = []
    this.growing = true;

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
        if (this.growing) {
          this.radius += borderGrowthSpeed;
      }
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

  for (let i = 0; i < borderList.length; i++) {
    for (let j = i + 1; j < borderList.length; j++) {
      let distanceBetweenCircles = dist(borderList[i].x, borderList[i].y, borderList[j].x, borderList[j].y);
      if (distanceBetweenCircles < (borderList[i].radius + borderList[j].radius)/2) {
        borderList[i].growing = false;
        borderList[j].growing = false;
      }
    }
  }
}

function mousePressed() {
  isTheMousePressed = true;

  buildings.sort((a,b) => a.y - b.y);
  mouseX1 = mouseX;
  mouseY1 = mouseY;
  centerX = mouseX;
  centerY = mouseY;
}


function mouseReleased() {
  // for (let i = 0; i < floor(random(4, 8)); i++) {
  //   let buildParams = Building.getBuildingParams();
  //   //console.log(`(${buildParams.x}, ${buildParams.y}) ${buildParams.w} ${buildParams.w * 4}`);
  //   buildings.push(new Building(buildParams.x, buildParams.y, buildParams.w, buildParams.w * 4));
  // }
  mouseX2 = mouseX;
  mouseY2 = mouseY;
  d = dist(mouseX1, mouseY1, mouseX2, mouseY2);
  radius = d * 2;

  test = new Border(mouseX1, mouseY1, radius);
  borderList.push(test);
  isTheMousePressed = false;
  borderPlaced = false;
}