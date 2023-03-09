var r;
var g;
var b;
var a;

class Border {
    constructor(x, y, radius) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      //this.maxRadius = this.radius + 100;
      this.growing = true; // bool to determine if it should grow or not
      r = random(255); // r is a random number between 0 - 255
      g = random(100,200); // g is a random number betwen 100 - 200
      b = random(100); // b is a random number between 0 - 100
      a = random(200,255); // a is a random number between 200 - 255
      this.color = [r, g, b, a];


    }
    
    draw() {
      push()
      noStroke();
      fill(this.color[0], this.color[1], this.color[2], this.color[3])
      ellipse(this.x, this.y, this.radius);
      pop()
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