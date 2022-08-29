/**
 * @class StairsGenerator
 * @classdesc Generates stairs for a cells in a grid.
 * @param {Object} data - The data object to use.
 * @param {Object} options - The options object to use.
 */
class StairsGenerator {
    constructor(data, options) {
        const MAX_STAIRS = options.max_stairs||1;
        let total_stairs_by_floor = [];
        // Iterate over each floor in the grid
        for (let floor = 0; floor < data.grid.total_floors - 1; floor++) {
            // Repeat loop until we find a cell that satisfies the conditions
            let cell = null;
            while (cell === null)
            {
                if (total_stairs_by_floor[floor] && total_stairs_by_floor[floor] >= MAX_STAIRS) {
                    break;
                }
                let previous_floor_cell = null;
                let next_floor_cell = null;

                // get a random cell from the current floor
                cell = data.grid.randomCell(floor);
                if (cell.blocked) {
                    cell = null;
                    continue;
                }

                // get the previous floor cell
                if (floor > 0) {
                    previous_floor_cell = data.grid.cells[floor - 1][cell.y][cell.x];
                    if (previous_floor_cell.blocked) {
                        previous_floor_cell = null;
                    }
                }

                // get the next floor cell
                next_floor_cell = data.grid.cells[floor + 1][cell.y][cell.x];
                if (next_floor_cell.blocked) {
                    next_floor_cell = null;
                }

                // add stairs if there is a previous or next floor cell
                if (next_floor_cell !== null && next_floor_cell.blocked === false) {
                    cell.stairs = {
                        next_floor: next_floor_cell,
                        direction: 'up'
                    };
                    if (next_floor_cell) next_floor_cell.stairs = {
                        previous_floor: cell,
                        direction: 'down'
                    };
                    total_stairs_by_floor[floor] = (total_stairs_by_floor[floor] || 0) + 1;
                    cell = null;
                }
                else {
                    cell = null;
                }
            }
        }

        this.data = data;
    }
}

module.exports = StairsGenerator;
