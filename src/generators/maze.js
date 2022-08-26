const Grid = require('../grid.js');
const {Random} = require("../utils");

class MazeGenerator {
    /**
     * @class MazeGenerator
     * @classdesc The maze generator class is responsible for generating a grid of Cell objects and storing them.
     * @param {Object} data - The data object to use.
     * @param {Object} options - The options object to use.
     * @param {Number} options.width - The width of the grid.
     * @param {Number} options.height - The height of the grid.
     * @param {Array} options.floors - The total number of floors in the grid.
     * @param {Number} options.start_x - The x position of the starting cell.
     * @param {Number} options.start_y - The y position of the starting cell.
     * @param {Number} options.start_z - The z position of the starting cell.
     * @param {Cell} options.grid_class - The class used to generate a grid, contains cell data.
     * @param {Cell} options.cell_class - The class used to represent a cell on the grid.
     * @param {Array} options.neighbor_positions - The array of neighbor positions to use.
     */
    constructor(data, options) {
        this.data = data||{};
        this.options = options;
        this.neighbor_positions = options.neighbor_positions || [[0, -2], [0, 2], [-2, 0], [2, 0]];
        this.start_cell_coord = { x: 1, y: 1 };
        const GridClass = options.grid_class || Grid;
        this.data.grid = new GridClass({
            width: options.width,
            height: options.height,
            total_floors: options.floors,
            cell_class: options.cell_class,
            start_x: options.start_x,
            start_y: options.start_y,
            start_z: options.start_z,
            floors: []
        });
        this.growingTree();
    }

    /**
     * @function getNeighborCells
     * @param {Object} cell
     * @returns {*[Cell]}
     */
    getNeighborCells = (cell) => {
        let neighbor_cells = [];
        for (let i = 0; i < 4; i++) {
            let nx = cell.x + this.neighbor_positions[i][0];
            let ny = cell.y + this.neighbor_positions[i][1];
            let neighbor_cell = this.data.grid.getNeighborCell(nx, ny, cell.z);
            if (neighbor_cell && !neighbor_cell.visited && neighbor_cell.blocked) {
                neighbor_cells.push(neighbor_cell);
            }
        }
        return neighbor_cells;
    }

    /**
     * @function growingTree
     * @description The growing tree algorithm.
     * @returns {void}
     */
    growingTree = () => {
        for (let z = 0; z < this.data.grid.total_floors; z++) {
            const x = this.start_cell_coord.x;
            const y = this.start_cell_coord.y;
            let get_cell = true;
            let prev_cells = [];
            let current_cell = this.data.grid.getCell(x, y, z);

            while (get_cell) {
                current_cell.visited = true;
                let neighbor_cells = this.getNeighborCells(current_cell);
                if (neighbor_cells.length > 0) {
                    let neighbor_cell = neighbor_cells[Random.range(0, neighbor_cells.length)];
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
                    let new_cell = this.data.grid.getCell(n_x, n_y, z);
                    new_cell.blocked = false;
                    current_cell.blocked = false;
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
    }
}

module.exports = MazeGenerator;
