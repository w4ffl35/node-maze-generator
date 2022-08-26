class Cell {
    constructor(x, y, z, visited = false) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.blocked = true;
        this.visited = visited || false;
    }
}

module.exports = Cell;