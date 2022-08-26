const Cell = require("./cell");
const {Random} = require("./utils");
const MIN_WIDTH = 5;
const MIN_HEIGHT = 5;
const MIN_BOUNDARY = -1;
const MIN_NEIGHBOR_BOUNDARY = 0;
const MIN_FLOORS = 1;

/**
 * @class Grid
 * @description The grid class is responsible for generating, storing and manipulating a grid of Cell object instances.
 * @param {Object} options - The options object.
 * @param {Number} options.width - The width of the grid.
 * @param {Number} options.height - The height of the grid.
 * @param {Array} options.floors - The total number of floors in the grid.
 * @param {Number} options.start_x - The x position of the starting cell.
 * @param {Number} options.start_y - The y position of the starting cell.
 * @param {Number} options.start_z - The z position of the starting cell.
 * @param {Cell} options.cell_class - The class used to represent a cell on the grid.
 */
class Grid {
    /**
     * @function constructor
     * @description Generate a Grid object of given dimensions filled with Cell objects and floor data.
     * @param  {Object} options  Optional arguments for the Grid object.
     */
    constructor(options) {
        // Initialize all properties, and then the grid.
        this.width = parseInt(options.width) || MIN_WIDTH;
        this.height = parseInt(options.height) || MIN_HEIGHT;
        this.total_floors = parseInt(options.total_floors) || MIN_FLOORS;
        this.start_x = parseInt(options.start_x) || 0;
        this.start_y = parseInt(options.start_y) || 0;
        this.start_z = parseInt(options.start_z) || 0;
        this.CellClass = options.cell_class||Cell;
        this.currentFloor = options.currentFloor||0;
        if (this.width <= MIN_WIDTH) this.width = MIN_WIDTH;
        if (this.height <= MIN_HEIGHT) this.height = MIN_HEIGHT;
        if (this.start_x > this.width - 1) this.start_x = this.start_x - 1;
        if (this.start_y > this.height - 1) this.start_y = this.start_y - 1;
        if (this.start_z >= this.total_floors) this.start_z = this.total_floors - 1;
        this.floors = [];
        this.initialize();
    }

    /**
     * @function initialize
     * @description Iterates through each coordinate and creates a cell at that location.
     * @return {void}
     */
    initialize = () => {
        this.cells = [];
        for (let z = this.start_z; z < this.total_floors; z++) {
            this.floors[z] = {};  // set floor data to an empty object
            this.cells[z] = [];
            for (let y = this.start_y; y < this.height; y++) {
                this.cells[z][y] = [];
                for (let x = this.start_x; x < this.width; x++) {
                    this.cells[z][y][x] = new this.CellClass(x, y, z);
                }
            }
        }
    }

    /**
     * @function randomCell
     * @description Returns a random cell from the grid.
     * @param  {Number} floor  The floor to get a cell from
     * @return {Object}        Cell object
     */
    randomCell = (floor) => {
        const x = Random.range(MIN_NEIGHBOR_BOUNDARY, this.width - 2);
        const y = Random.range(MIN_NEIGHBOR_BOUNDARY, this.height - 2);
        const z = floor || Random.range(MIN_NEIGHBOR_BOUNDARY, this.total_floors - 1);
        return this.getCell(x, y, z);
    }

    /**
     * @function isInBounds
     * @description Checks if given coordinates are within the bounds of the grid.
     * @param  {Number} x    x-coordinate of the cell
     * @param  {Number} y    y-coordinate of the cell
     * @return {Boolean}     true if in bounds, false otherwise
     */
    isInBounds = (x, y) => (
        x < this.width
        && x > MIN_BOUNDARY
        && y < this.height
        && y > MIN_BOUNDARY
    );

    /**
     * @function isInNavigationBounds
     * @description Checks if given coordinates are within the bounds of the grid used for navigation.
     * @param  {Number} x    x-coordinate of the cell
     * @param  {Number} y    y-coordinate of the cell
     * @return {Boolean}     true if in bounds, false otherwise
     */
    isInNavigationBounds = (x, y) => (
        x < this.width - 1
        && x > MIN_NEIGHBOR_BOUNDARY
        && y < this.height - 1
        && y > MIN_NEIGHBOR_BOUNDARY
    );

    /**
     * @function getCell
     * @description Gets a cell from the grid.
     * @param  {Number} x   x-coordinate of the cell
     * @param  {Number} y   y-coordinate of the cell
     * @param  {Number} z   the floor of the cell
     * @return {Object}     Cell object if in bounds, null otherwise
     */
    getCell = (x, y, z) => this.isInBounds(x, y) ? this.cells[z][y][x] : null;

    /**
     * @function getNeighborCell
     * @description Gets a cell from the grid. Functions the same as getCell, but checks against navigation bounds.
     * @param  {Number} x   x-coordinate of the cell
     * @param  {Number} y   y-coordinate of the cell
     * @param  {Number} z   the floor of the cell
     * @return {Object}     Cell object if in bounds, null otherwise
     */
    getNeighborCell = (x, y, z) => this.isInNavigationBounds(x, y) ? this.cells[z][y][x] : null;

    /**
     * @function unblockCell
     * @description Unblocks a cell if it is in bounds.
     * @param {Number} x  x-coordinate of the cell
     * @param {Number} y  y-coordinate of the cell
     * @param {Number} z  the floor of the cell
     * @return {void}
     */
    unblockCell = (x, y, z) => {
        if (this.isInBounds(x, y)) {
            this.cells[z][y][x].blocked = false;
        }
    }
}

module.exports = Grid;