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
let d
//let radius

let mouseX1
let mouseY1
let mouseX2
let mouseY2

//let buildSizeHeightMin = 20;
//let buildSizeHeightMax = 101;
// using same parameters for the x and y positions
//let buildPosMin = (-radius/2) + 10;
//let buildPosMax = (radius/2) - 10;

// Array to store buildings
let buildings = [];
let borderList = [];
let cityList = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  /*
  for (let i = 0; i < buildings.length; i++) {
    buildings[i].draw();
  }*/
  
  // for (let i = 0; i < borderList.length; i++) {
  //   borderList[i].draw();
  // }

  for (let i = 0; i < cityList.length; i++) {
    cityList[i].update();
  }

  //determines if one border is hitting the other and sets their growth to false
  // for (let i = 0; i < borderList.length; i++) {
  //   for (let j = i + 1; j < borderList.length; j++) {
  //     let distanceBetweenCircles = dist(borderList[i].x, borderList[i].y, borderList[j].x, borderList[j].y);
  //     if (distanceBetweenCircles < (borderList[i].radius + borderList[j].radius)/2) {
  //       borderList[i].growing = false;
  //       borderList[j].growing = false;
  //     }
  //   }
  // }

  for (let i = 0; i < cityList.length; i++) {
    for (let j = i + 1; j < cityList.length; j++) {
      let distanceBetweenCircles = dist(cityList[i].x, cityList[i].y, cityList[j].x, cityList[j].y);
      if (distanceBetweenCircles < (cityList[i].border.radius + cityList[j].border.radius)/2) {
        cityList[i].border.growing = false;
        cityList[j].border.growing = false;
      }
    }
  }
}

function mousePressed() {
  isTheMousePressed = true;

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

  test = new City(mouseX1, mouseY1, radius);
  cityList.push(test);
  isTheMousePressed = false;
  borderPlaced = false;
}