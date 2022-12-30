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
        this.generate();
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
     * @function generate
     * @description Generate a maze using the growing tree algorithm.
     * @returns {void}
     */
    generate = () => {
        const { x: startX, y: startY } = this.start_cell_coord;
        const { total_floors } = this.data.grid;

        for (let z = 0; z < total_floors; z++) {
            let prevCells = [];
            let currentCell = this.data.grid.getCell(startX, startY, z);

            while (true) {
                currentCell.visited = true;
                const neighborCells = this.getNeighborCells(currentCell);
                if (neighborCells.length === 0) {
                    if (prevCells.length === 0) break;
                    currentCell = prevCells.pop();
                } else {
                    const neighborCell = neighborCells[Random.range(0, neighborCells.length)];
                    let { x: nX, y: nY } = currentCell;
                    if (neighborCell.x > currentCell.x) nX += 1;
                    else if (neighborCell.x < currentCell.x) nX -= 1;
                    if (neighborCell.y > currentCell.y) nY += 1;
                    else if (neighborCell.y < currentCell.y) nY -= 1;
                    const newCell = this.data.grid.getCell(nX, nY, z);
                    newCell.blocked = false;
                    currentCell.blocked = false;
                    prevCells.push(currentCell);
                    currentCell = neighborCell;
                }
            }
        }
    }
}

module.exports = MazeGenerator;
