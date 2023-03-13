// VARIABLES FOR BUILDINGS
const 
    BUILDWIDTHMIN = 5, 
    BUILDWIDTHMAX = 20;

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
      //fill(0);
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

    static get BUILDWIDTHMIN() {
        return BUILDWIDTHMIN;
    }

    static get BUILDWIDTHMAX() {
        return BUILDWIDTHMAX;
    }
  }