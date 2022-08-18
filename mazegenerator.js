const Cell = require('./cell.js');

const MIN_WIDTH = 5;
const MIN_HEIGHT = 5;
const MIN_OUT_OF_BOUNDS = -1;
const START_X = 0;
const START_Y = 0;
const NEIGHBOR_POSITIONS = [[0, -2], [0, 2], [-2, 0], [2, 0]];

class NodeMazeGenerator {
    width = MIN_WIDTH;
    height = MIN_HEIGHT;
    max_rooms = 0;
    cells = [];
    start_cell_coord = { x: 1, y: 1 };
    unblock_neighbor = false;

    constructor(width, height, max_rooms) {
        this.width = parseInt(width);
        this.height = parseInt(height);
        this.max_rooms = parseInt(max_rooms);
        if (this.width <= MIN_WIDTH) this.width = MIN_WIDTH;
        if (this.height <= MIN_HEIGHT) this.height = MIN_HEIGHT;
        this.initializeCells();
    }

    initializeCells = () => {
        for (let y = START_Y; y < this.height; y++) {
            this.cells[y] = [];
            for (let x = START_X; x < this.width; x++) {
                this.cells[y][x] = new Cell(x, y);
            }
        }
    }

    randomRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    isInBounds = (x, y) => x < this.width && x > MIN_OUT_OF_BOUNDS && y < this.height && y > MIN_OUT_OF_BOUNDS;

    isInNeighborBounds = (x, y) => x < this.width - 1 && x > MIN_OUT_OF_BOUNDS + 1 && y < this.height - 1 && y > MIN_OUT_OF_BOUNDS + 1;

    getCell = (x, y) => {
        return this.isInBounds(x, y) ? this.cells[y][x] : null;
    }

    getNeighborCell = (x, y) => {
        return this.isInNeighborBounds(x, y) ? this.cells[y][x] : null;
    }

    getNeighborCells = (cell) => {
        let neighbor_cells = [];
        for (let i = 0; i < 4; i++) {
            let nx = cell.x + NEIGHBOR_POSITIONS[i][0];
            let ny = cell.y + NEIGHBOR_POSITIONS[i][1];
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