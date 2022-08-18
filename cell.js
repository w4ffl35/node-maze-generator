// A cell object class which contains all the information about a cell.

class Cell {
    constructor(x, y, displayed, exits) {
        this.x = x;
        this.y = y;
        this.displayed = displayed;
        this.exits = exits;
        this.displayed = false;
        this.visited = false;
    }

    get exits() {
        return this._exits;
    }

    set exits(value) {
        this._exits = value;
    }
}