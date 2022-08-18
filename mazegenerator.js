const Cell = require('./cell.js');

const NORTH = 1;
const SOUTH = 2;
const EAST = 3;
const WEST = 4;
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
    start_cell_coord = { x: 0, y: 0 };
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
        for (let x = START_X; x < this.width; x++) {
            this.cells[x] = [];
            for (let y = START_Y; y < this.height; y++) {
                this.cells[x][y] = new Cell(x, y);
            }
        }
    }

    randomRange = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    isInBounds = (x, y) => x < this.width && x > MIN_OUT_OF_BOUNDS && y < this.height && y > MIN_OUT_OF_BOUNDS;

    isCellVisited = (x, y) => this.cells[y][x].visited;

    track_unvisited_neighbors = (x, y, neighbor_cells) => {
        if (this.isInBounds(x, y)) {
            let cell = this.cells[y][x];
            if (!cell.visited && cell.blocked)
            {
                neighbor_cells.push(cell);
            }
        }
        return neighbor_cells;
    }

    get_neighbor_cells = (cell, neighbor_cells) => {
        for (let i = 0; i < 4; i++) {
            neighbor_cells = this.track_unvisited_neighbors(
                cell.x + NEIGHBOR_POSITIONS[i][0],
                cell.y + NEIGHBOR_POSITIONS[i][1],
                neighbor_cells
            );
        }
        return neighbor_cells;
    }

    set_cell_exits = (direction, cell) => {
        let exits = cell.exits;
        if (!exits.includes(direction)) {
            exits.push(direction);
            this.cells[cell.y][cell.x].exits = exits;
        }
        this.cells[cell.y][cell.x].visited = true;
    }

    update_cell = (cell) => this.cells[cell.y][cell.x] = cell;


    growing_tree = () => {
        const x = this.start_cell_coord.x;
        const y = this.start_cell_coord.y;
        let get_cell = true;
        let prev_cells = [];
        let current_cell = this.cells[y][x];

        while (get_cell) {
            current_cell.visited = true;
            this.update_cell(current_cell);
            let neighbor_cells = this.get_neighbor_cells(current_cell, []);
            if (neighbor_cells.length > 0) {
                let neighbor_cell_index = this.randomRange(0, neighbor_cells.length - 1);
                let neighbor_cell = neighbor_cells[neighbor_cell_index];

                // Set exits
                let n_x = current_cell.x;
                let n_y = current_cell.y;
                if (neighbor_cell.x > n_x) {
                    n_x += 1;
                }
                else if (neighbor_cell.x < n_x) {
                    n_x -= 1;
                }
                if (neighbor_cell.y > n_y) {
                    n_y += 1;
                }
                else if (neighbor_cell.y < n_y) {
                    n_y -= 1;
                }
                let new_cell = this.cells[neighbor_cell.y][neighbor_cell.x];
                new_cell.blocked = false;
                current_cell.blocked = false;
                neighbor_cell.visited = true;
                neighbor_cell.blocked = this.unblock_neighbor ? false : neighbor_cell.blocked;
                this.update_cell(new_cell);
                this.update_cell(neighbor_cell);
                this.update_cell(current_cell);
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

    add_rooms = () => {
        for (let n = 0; n < this.max_rooms; n++) {
            let x = this.randomRange(START_X, this.width);
            let y = this.randomRange(START_Y, this.height);
            let cell = this.cells[y][x]
            if (y > START_Y) {
                this.set_cell_exits(NORTH, cell)
            }
            else if (y < this.height - 1) {
                this.set_cell_exits(SOUTH, cell)
            }
            if (x > START_X) {
                this.set_cell_exits(WEST, cell)
            }
            else if (x < this.width - 1) {
                this.set_cell_exits(EAST, cell)
            }
            x += 1
            if (x < this.width) {
                this.set_cell_exits(WEST, this.cells[y][x])
            }
            x -= 2
            if (x > MIN_OUT_OF_BOUNDS) {
                this.set_cell_exits(EAST, this.cells[y][x])
            }
            x += 1
            y += 1
            if (y < this.height) {
                this.set_cell_exits(NORTH, this.cells[y][x])
            }
            y -= 2
            if (y > MIN_OUT_OF_BOUNDS) {
                this.set_cell_exits(SOUTH, this.cells[y][x])
            }
        }
    }

    spawn_items = () => {}

    generate = () => {
        this.growing_tree()
        this.add_rooms()
        this.spawn_items()
    }
}

module.exports = NodeMazeGenerator;