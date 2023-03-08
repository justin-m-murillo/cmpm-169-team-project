class Border {
    constructor(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.maxRadius = this.radius + 100;
      this.growing = true; // bool to determine if it should grow or not

    }
    
    draw() {
      stroke(0);
      noFill()
      ellipse(this.x, this.y, this.radius);
      
      this.growBorder();
    }
  
    growBorder() {
        let borderGrowthSpeed = 0.1;

        //if (this.radius < this.maxRadius) {
          if (this.growing) {
            this.radius += borderGrowthSpeed;
        }
      //}
    }
  }