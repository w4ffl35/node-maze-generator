// Javascript class called NodeMazeGenerator which will generate a maze using the growing tree algorithm.
// The maze is generated using a 2D array of Cell objects.
// The maze is generated by starting at the top left corner of the maze and then randomly choosing a direction to move in.
import { Cell } from './cell.js';

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
    constructor(width, height) {
        this.width = width || 10;
        this.height = height || 10;
        this.cells = [];
        for (let x = 0; x < this.width; x++) {
            this.cells[x] = [];
            for (let y = 0; y < this.height; y++) {
                this.cells[x][y] = new Cell(x, y, 1, 1);
            }
        }
    }

    get_unvisited_cell = (x, y) => {
        if (x < this.width && x > -1 && y < this.height && y > -1) {
            if (!this.cells[y][x].visited) {
                return this.cells[y][x]
            }
        }
        return null;
    }

    get_neighbor_cells = (x, y) => {
        let neighbor_cells = []
        let cell1 = this.get_unvisited_cell(x + 1, y)
        let cell2 = this.get_unvisited_cell(x - 1, y)
        let cell3 = this.get_unvisited_cell(x, y + 1)
        let cell4 = this.get_unvisited_cell(x, y - 1)
        if (cell1)
            neighbor_cells.push(cell1)
        if (cell2)
            neighbor_cells.push(cell2)
        if (cell3)
            neighbor_cells.push(cell3)
        if (cell4)
            neighbor_cells.push(cell4)
        return neighbor_cells
    }

    set_cell_exits = (direction, cell) => {
        let exits = cell.exits;
        if (!exits.contains(direction)) {
            exits.push(direction);
            this.cells[cell.y][cell.x].exits = exits;
        }
        this.cells[cell.y][cell.x].visited = true;
    }


    growing_tree = () => {
        let prev_cells = [];
        let cell = thiscells[random.randrange(0, this.width)][random.randrange(0, this.height)];
        let ncell = null;
        let dir_a = null;
        let dir_b = null;

        while (cell) {
            let neighbor_cells = this.get_neighbor_cells(cell.x, cell.y);
            if (neighbor_cells.length > 0) {
                let ncell = random.choice(neighbor_cells);  // TODO
                let dir_a = null;
                let dir_b = null;
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
        for (let n = 0; n < 10; n++) {
            let x = random.randrange(0, self.width - 1)
            let y = random.randrange(0, self.height - 1)
            let cell = self.cells[y][x]
            if (y > 0) self.set_cell_exits(NORTH, cell)
            if (y < self.height - 1) self.set_cell_exits(SOUTH, cell)
            if (x > 0) self.set_cell_exits(WEST, cell)
            if (x < self.width - 1) self.set_cell_exits(EAST, cell)
            x += 1
            if (x < self.width) self.set_cell_exits(WEST, self.cells[y][x])
            x -= 2
            if (x > -1) self.set_cell_exits(EAST, self.cells[y][x])
            x += 1
            y += 1
            if (y < self.height) self.set_cell_exits(NORTH, self.cells[y][x])
            y -= 2
            if (y > -1) self.set_cell_exits(SOUTH, self.cells[y][x])
        }
    }


    spawn_items = () => {}

    generate = () => {
        self.growing_tree()
        self.add_rooms()
        self.spawn_items()
    }
}