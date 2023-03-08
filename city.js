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

    update() {
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

        this.border.draw();
    }

    // Adds a building to the border
    addBuilding() {
        let buildingSize = floor(random(Building.BUILDWIDTHMIN, Building.BUILDWIDTHMAX));
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