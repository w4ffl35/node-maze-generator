const Cell = require('./cell.js');

const NORTH = 1;
const SOUTH = 2;
const EAST = 3;
const WEST = 4;
const NEIGHBOR_SPACE = 1;
const MIN_WIDTH = 5;
const MIN_HEIGHT = 5;
const MIN_OUT_OF_BOUNDS = -1;
const START_X = 0;
const START_Y = 0;

class NodeMazeGenerator {
    width = MIN_WIDTH;
    height = MIN_HEIGHT;
    max_rooms = 0;
    cells = [];

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

    get_unvisited_cell = (x, y) => this.isInBounds(x, y) && !this.isCellVisited(x, y) ? this.cells[y][x] : null;

    get_neighbor_cells = (x, y) => {
        let neighbor_cells = []
        let cell1 = this.get_unvisited_cell(x + NEIGHBOR_SPACE, y)
        let cell2 = this.get_unvisited_cell(x - NEIGHBOR_SPACE, y)
        let cell3 = this.get_unvisited_cell(x, y + NEIGHBOR_SPACE)
        let cell4 = this.get_unvisited_cell(x, y - NEIGHBOR_SPACE)
        if (cell1 !== null) neighbor_cells.push(cell1)
        if (cell2 !== null) neighbor_cells.push(cell2)
        if (cell3 !== null) neighbor_cells.push(cell3)
        if (cell4 !== null) neighbor_cells.push(cell4)
        return neighbor_cells
    }

    set_cell_exits = (direction, cell) => {
        let exits = cell.exits;
        if (!exits.includes(direction)) {
            exits.push(direction);
            this.cells[cell.y][cell.x].exits = exits;
        }
        this.cells[cell.y][cell.x].visited = true;
    }


    growing_tree = () => {
        let prev_cells = [];
        let cell = this.cells[this.randomRange(START_X, this.width)][this.randomRange(START_Y, this.height)];
        let ncell = null;
        let dir_a = null;
        let dir_b = null;
        while (cell) {
            let neighbor_cells = this.get_neighbor_cells(cell.x, cell.y);
            if (neighbor_cells.length > 0) {

                // get random item from neighbor_cells
                ncell = neighbor_cells[this.randomRange(0, neighbor_cells.length)];
                dir_a = null;
                dir_b = null;
                if (ncell.x > cell.x) {
                    dir_a = EAST;
                    dir_b = WEST;
                }
                else if (ncell.x < cell.x) {
                    dir_a = WEST;
                    dir_b = EAST;
                }
                else if (ncell.y > cell.y) {
                    dir_a = SOUTH;
                    dir_b = NORTH;
                }
                else if (ncell.y < cell.y) {
                    dir_a = NORTH;
                    dir_b = SOUTH;
                }
                if (dir_a && dir_b) {
                    this.set_cell_exits(dir_a, cell);
                }
                this.set_cell_exits(dir_b, ncell);
                prev_cells.push(cell);
                cell = this.cells[ncell.y][ncell.x];
            }
            else {
                if (prev_cells.length > 0) {
                    cell = prev_cells.pop();
                }
                else {
                    cell = null;
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

// export the maze generator
module.exports = NodeMazeGenerator;