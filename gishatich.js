var LivingCreature =require("./livingcreature.js");
module.exports=class Gishatich extends LivingCreature {
    constructor(x, y,index) {
        super(x,y,index);
        this.x = x;
        this.y = y;
        this.energy = 15;
        
    }

    getNewDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ]
    }
    chooseCell(character) {
        this.getNewDirections();
        return super.chooseCell(character);
    }

    mult() {
        var empty = random(this.chooseCell(0))
        if (empty && this.energy > 20) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3
            var gsh = new Gishatich(newX, newY)
            GishatichArr.push(gsh)
        }
    }

    move() {
        var empty = random(this.chooseCell(0))
        this.energy--;
        if (empty) {
            var newX = empty[0]
            var newY = empty[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0

            this.x = newX
            this.y = newY
        }
    }

    eat() {
        var food = random(this.chooseCell(2))
        if (food) {
            var newX = food[0]
            var newY = food[1]
            matrix[newY][newX] = 3
            matrix[this.y][this.x] = 0

            for (var i in xotakerArr) {
                if (xotakerArr[i].x == newX && xotakerArr[i].y == newY) {
                    xotakerArr.splice(i, 1)
                }
            }

            this.x = newX
            this.y = newY
            this.energy += 2
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0
            for (var i in GishatichArr) {
                if (GishatichArr[i].x == this.x && GishatichArr[i].y == this.y) {
                    GishatichArr.splice(i, 1)
                }
            }
        }
    }
}