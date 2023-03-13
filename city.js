const BUILDING_TIMER = 50; // Constants for Borders

class City {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.border = new Border(this.x, this.y, radius);
        this.buildings = [];

        // Keeps track of adds a building per timer
      this.buildingTimer = BUILDING_TIMER
    }

    drawBorder() {
        this.border.draw();
    }

    drawBuildings() {
        for (let i = 0; i < this.buildings.length; i++) {
            this.buildings[i].draw();
            //print(true)
            for (let j = i + 1; j < this.buildings.length; j++) {
                // get distance between the two buildings
                let d = dist(this.buildings[i].x, this.buildings[i].y, this.buildings[j].x, this.buildings[j].y);
                // If the distance is less than a certain threshold, draw a road between them
                if (d < 70) {
                  stroke(0);
                  line(this.buildings[i].x, this.buildings[i].y, this.buildings[j].x, this.buildings[j].y);
                  break;
                }
              }
        }
        
    }

    update() {
        this.area = PI * (this.border.radius * this.border.radius)

        //print("radius: " + this.border.radius)
        //print(this.buildings.length)
        //print("area of border: " + this.buildings.length/this.area);
        if(this.border.radius / 3 > this.buildings.length) {
            if (this.buildingTimer > 0) {
                this.buildingTimer -= 1;
            } else {
                this.addBuilding();
                this.buildingTimer = BUILDING_TIMER;
            }
        }
        else {
            print("cant build");
        }
    }

    // Adds a building to the border
    addBuilding() {
        //let buildingSize = floor(random(Building.BUILDWIDTHMIN, Building.BUILDWIDTHMAX));
        let buildingSizeRange = floor(random(Building.BUILDWIDTHMIN, Building.BUILDWIDTHMIN + 10))
        let radiusSizeFactor = floor((this.border.radius/2) / 100)
        let buildingSize = buildingSizeRange + radiusSizeFactor
        let r = this.border.radius/2 * sqrt(random());
        let theta = random() * 2 * PI;
        let xpos = r * cos(theta) + this.x;
        let ypos = r * sin(theta) + this.y;
        let newBuilding = new Building(
            xpos,
            ypos,
            buildingSize,
            buildingSize * 4
        );
        this.buildings.push(newBuilding);
        this.buildings.sort((a,b) => a.y - b.y);
    }

    static get BUILDING_TIMER() {
        return BUILDING_TIMER;
    }
}