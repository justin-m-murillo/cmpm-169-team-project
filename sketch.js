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
let d;

let mouseX1
let mouseY1
let mouseX2
let mouseY2

// Array to store buildings
let cityList = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);

  for (let i = 0; i < cityList.length; i++) {
    cityList[i].update();
  }

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
  mouseX2 = mouseX;
  mouseY2 = mouseY;
  d = dist(mouseX1, mouseY1, mouseX2, mouseY2);
  radius = d * 2;

  test = new City(mouseX1, mouseY1, radius);
  cityList.push(test);
  isTheMousePressed = false;
  borderPlaced = false;
}