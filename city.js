const BUILDING_TIMER = 50; // Constants for Borders
var r;
var g;
var b;
var a;

class City {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.border = new Border(this.x, this.y, radius);
        this.buildings = [];
        r = random(255); // r is a random number between 0 - 255
        g = random(100,200); // g is a random number betwen 100 - 200
        b = random(100); // b is a random number between 0 - 100
        a = random(200,255); // a is a random number between 200 - 255
        this.color = [r, g, b, a];
        // Keeps track of adds a building per timer
      this.buildingTimer = BUILDING_TIMER
    }

    drawBorder() {
        fill(this.color[0], this.color[1], this.color[2], this.color[3])

        this.border.draw();
    }

    drawBuildings() {
        fill(this.color[0], this.color[1], this.color[2], this.color[3])
        for (let i = 0; i < this.buildings.length; i++) {
            this.buildings[i].draw();
            //print(true)
        }
    }

    update() {

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