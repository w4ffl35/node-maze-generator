/**
 * @class ElevatorGenerator
 * @classdesc Generates elevators for a cells in a grid.
 * @param {Object} data - The data object to use.
 */
class ElevatorGenerator {
    constructor(data) {
        const max_elevators = 5;
        for (let z = 0; z < data.grid.total_floors; z++) {
            let hasElevators = false;
            while (!hasElevators) {
                // get a random cell
                let cell = data.grid.randomCell(z);

                // if the cell isn't blocked and the elevators aren't at max, randomly add an elevator
                if (!cell.blocked) {
                    let total_elevators = data.grid.floors[cell.z].total_elevators || 0;
                    if (total_elevators < max_elevators && this.allRoomsConnected(cell, data)) {
                        for (let z = 0; z < data.grid.total_floors; z++) {
                            if (!data.grid.cells[z][cell.x][cell.y].elevators) {
                                hasElevators = true;
                                data.grid.cells[z][cell.x][cell.y].elevators = true;
                                data.grid.floors[cell.z].total_elevators = total_elevators + 1;
                            }
                        }
                    }
                }
            }
        }

        this.data = data;
    }

    /**
     * @function allRoomsConnected
     * @description Checks if all rooms can be connected vertically via elevator.
     * @return {Boolean} true if all cells at given dimensions are unblocked, false otherwise.
     */
    allRoomsConnected(cell, data) {
        for (let z = 0; z < data.grid.total_floors; z++) {
            if (data.grid.cells[z][cell.x][cell.y].blocked) {
                return false;
            }
        }
        return true;
    }
}

module.exports = ElevatorGenerator;
