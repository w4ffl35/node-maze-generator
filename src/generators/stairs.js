/**
 * @class StairsGenerator
 * @classdesc Generates stairs for a cells in a grid.
 * @param {Object} data - The data object to use.
 * @param {Object} options - The options object to use.
 */
class StairsGenerator {
    constructor(data, options) {
        this.data = data||{};
        this.options = options||{};
        this.max_stairs = options.max_stairs || 1;
        this.generate();
    }

    generate = () => {
        let total_stairs_by_floor = {};
        // Iterate over each floor in the grid
        for (let floor = 0; floor < this.data.grid.total_floors - 1; floor++) {
            // Repeat loop until we find a cell that satisfies the conditions
            let cell = null;
            while (true)
            {
                if (total_stairs_by_floor[floor] && total_stairs_by_floor[floor] >= this.max_stairs) {
                    break;
                }
                let previous_floor_cell = null;
                let next_floor_cell = null;

                // get a random cell from the current floor
                cell = this.data.grid.randomCell(floor);
                if (cell.blocked) {
                    continue;
                }

                // get the previous floor cell
                if (floor > 0) {
                    previous_floor_cell = this.data.grid.cells[floor - 1][cell.y][cell.x];
                    if (previous_floor_cell.blocked) {
                        previous_floor_cell = null;
                    }
                }

                // get the next floor cell
                next_floor_cell = this.data.grid.cells[floor + 1][cell.y][cell.x];
                if (next_floor_cell === null || next_floor_cell.blocked) {
                    continue;
                }

                // add stairs
                cell.stairs = {
                    next_floor: next_floor_cell,
                    direction: 'up'
                };
                if (next_floor_cell) next_floor_cell.stairs = {
                    previous_floor: cell,
                    direction: 'down'
                };
                total_stairs_by_floor[floor] = (total_stairs_by_floor[floor] || 0) + 1;
            }
        }
    }
}

module.exports = StairsGenerator;
