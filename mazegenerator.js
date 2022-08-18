const Cell = require('./cell.js');

const MIN_WIDTH = 5;
const MIN_HEIGHT = 5;
const MIN_BOUNDARY = -1;
const MIN_NEIGHBOR_BOUNDARY = 0;

class NodeMazeGenerator {
    constructor(options) {
        this.width = parseInt(options.width || MIN_WIDTH);
        this.height = parseInt(options.height || MIN_HEIGHT);
        this.max_rooms = parseInt(options.max_rooms || 0);
        this.CellClass = options.cell_class||Cell;
        this.neighbor_positions = options.neighbor_positions || [[0, -2], [0, 2], [-2, 0], [2, 0]];
        this.start_x = parseInt(options.start_x || 0);
        this.start_y = parseInt(options.start_y || 0);
        this.cells = [];
        this.start_cell_coord = { x: 1, y: 1 };
        this.unblock_neighbor = false;
        if (this.width <= MIN_WIDTH) this.width = MIN_WIDTH;
        if (this.height <= MIN_HEIGHT) this.height = MIN_HEIGHT;
        if (this.start_x > this.width - 1) this.start_x = this.start_x - 1;
        if (this.start_y > this.height - 1) this.start_y = this.start_y - 1;
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

    randomRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    isInBounds = (x, y) => x < this.width && x > MIN_BOUNDARY && y < this.height && y > MIN_BOUNDARY;

    isInNeighborBounds = (x, y) => x < this.width - 1 && x > MIN_NEIGHBOR_BOUNDARY && y < this.height - 1 && y > MIN_NEIGHBOR_BOUNDARY;

    getCell = (x, y) => {
        return this.isInBounds(x, y) ? this.cells[y][x] : null;
    }

    getNeighborCell = (x, y) => {
        return this.isInNeighborBounds(x, y) ? this.cells[y][x] : null;
    }

    getNeighborCells = (cell) => {
        let neighbor_cells = [];
        for (let i = 0; i < 4; i++) {
            let nx = cell.x + this.neighbor_positions[i][0];
            let ny = cell.y + this.neighbor_positions[i][1];
            let neighbor_cell = this.getNeighborCell(nx, ny);
            if (neighbor_cell && !neighbor_cell.visited && neighbor_cell.blocked) {
                neighbor_cells.push(neighbor_cell);
            }
        }
        return neighbor_cells;
    }

    updateCell = (cell) => {
        this.cells[cell.y][cell.x] = cell;
    }

    growingTree = () => {
        const x = this.start_cell_coord.x;
        const y = this.start_cell_coord.y;
        let get_cell = true;
        let prev_cells = [];
        let current_cell = this.getCell(x, y);

        while (get_cell) {
            current_cell.visited = true;
            this.updateCell(current_cell);
            let neighbor_cells = this.getNeighborCells(current_cell);
            if (neighbor_cells.length > 0) {
                let neighbor_cell = neighbor_cells[this.randomRange(0, neighbor_cells.length)];

                // Set exits
                let n_x = current_cell.x;
                let n_y = current_cell.y;
                if (neighbor_cell.x > current_cell.x) {
                    n_x += 1;
                }
                else if (neighbor_cell.x < current_cell.x) {
                    n_x -= 1;
                }
                if (neighbor_cell.y > current_cell.y) {
                    n_y += 1;
                }
                else if (neighbor_cell.y < current_cell.y) {
                    n_y -= 1;
                }
                let new_cell = this.getCell(n_x, n_y);
                new_cell.blocked = false;
                current_cell.blocked = false;
                neighbor_cell.visited = true;
                if (this.unblock_neighbor) {
                    neighbor_cell.blocked = false;
                }
                this.updateCell(new_cell);
                this.updateCell(neighbor_cell);
                this.updateCell(current_cell);
                prev_cells.push(current_cell);
                current_cell = neighbor_cell;
            }
            else {
                if (prev_cells.length > 0) {
                    current_cell = prev_cells.pop();
                }
                else {
                    get_cell = false;
                }
            }
        }
    }

    generate = () => {
        this.growingTree()
    }
}

module.exports = NodeMazeGenerator;