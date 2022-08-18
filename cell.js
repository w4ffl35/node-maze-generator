class Cell {
    constructor(x, y, visited = false, displayed = false) {
        this.x = x;
        this.y = y;
        this.exits = [];
        this.displayed = displayed || false;
        this.visited = visited || false;
    }
}

module.exports = Cell;