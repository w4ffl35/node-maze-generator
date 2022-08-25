const Cell = require("./cell");
const MIN_WIDTH = 5;
const MIN_HEIGHT = 5;
const MIN_BOUNDARY = -1;
const MIN_NEIGHBOR_BOUNDARY = 0;

class Grid {
    constructor(options) {
        this.cells = [];
        this.width = parseInt(options.width || MIN_WIDTH);
        this.height = parseInt(options.height || MIN_HEIGHT);
        this.start_x = parseInt(options.start_x || 0);
        this.start_y = parseInt(options.start_y || 0);
        if (this.width <= MIN_WIDTH) this.width = MIN_WIDTH;
        if (this.height <= MIN_HEIGHT) this.height = MIN_HEIGHT;
        if (this.start_x > this.width - 1) this.start_x = this.start_x - 1;
        if (this.start_y > this.height - 1) this.start_y = this.start_y - 1;
        this.CellClass = options.cell_class||Cell;
        this.initializeCells();
    }

    initializeCells = () => {
        for (let y = this.start_y; y < this.height; y++) {
            this.cells[y] = [];
            for (let x = this.start_x; x < this.width; x++) {
                this.cells[y][x] = new this.CellClass(x, y);
            }
        }
    }

    isInBounds = (x, y) => x < this.width && x > MIN_BOUNDARY && y < this.height && y > MIN_BOUNDARY;

    // Returns true if coordinates are within navigation rectangle
    isInNavigationBounds = (x, y) => x < this.width - 1 && x > MIN_NEIGHBOR_BOUNDARY && y < this.height - 1 && y > MIN_NEIGHBOR_BOUNDARY;

    getCell = (x, y) => this.isInBounds(x, y) ? this.cells[y][x] : null;

    getNeighborCell = (x, y) => this.isInNavigationBounds(x, y) ? this.cells[y][x] : null;

    unblockCell = (x, y) => {
        if (this.isInBounds(x, y)) {
            this.cells[y][x].blocked = false;
        }
    }
}

module.exports = Grid;