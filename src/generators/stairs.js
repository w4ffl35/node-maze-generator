/**
 * @class StairsGenerator
 * @classdesc Generates stairs for a cells in a grid.
 * @param {Object} data - The data object to use.
 * @param {Object} options - The options object to use.
 */
class StairsGenerator {
    constructor(data, _options) {
        // Iterate over each floor in the grid
        for (let floor = 0; floor < data.grid.total_floors; floor++) {
            // Repeat loop until we find a cell that satisfies the conditions
            let cell = null;
            while (cell === null || cell.blocked)
            {
                let previous_floor_cell = null;
                let next_floor_cell = null;

                // get a random cell from the current floor
                cell = data.grid.randomCell(floor);

                // get the previous floor cell
                if (floor > 0) {
                    previous_floor_cell = data.grid.cells[floor - 1][cell.y][cell.x];
                    if (previous_floor_cell.blocked) {
                        previous_floor_cell = null;
                    }
                }

                // get the next floor cell
                if (floor < data.grid.total_floors - 1) {
                    next_floor_cell = data.grid.cells[floor + 1][cell.y][cell.x];
                    if (next_floor_cell.blocked) {
                        next_floor_cell = null;
                    }
                }

                // add stairs if there is a previous or next floor cell
                if (previous_floor_cell !== null || next_floor_cell !== null) {
                    cell.stairs = true;
                    if (previous_floor_cell) previous_floor_cell.stairs = true;
                    if (next_floor_cell) next_floor_cell.stairs = true;
                }
                else {
                    // nullify the current cell, causing the loop to repeat
                    cell = null;
                }
            }
        }

        this.data = data;
    }
}

module.exports = StairsGenerator;
