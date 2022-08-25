const Grid = require('./grid.js');
const randomRange = require('./utils.js').randomRange;

class NodeMazeGenerator {
    constructor(options) {
        this.options = options;
        this.generators = options.generators || [];
        this.neighbor_positions = options.neighbor_positions || [[0, -2], [0, 2], [-2, 0], [2, 0]];
        this.start_cell_coord = { x: 1, y: 1 };
        const GridClass = options.grid_class || Grid;
        this.grid = new GridClass({
            width: options.width,
            height: options.height,
            cell_class: options.cell_class,
            start_x: options.start_x,
            start_y: options.start_y
        });
    }

    getNeighborCells = (cell) => {
        let neighbor_cells = [];
        for (let i = 0; i < 4; i++) {
            let nx = cell.x + this.neighbor_positions[i][0];
            let ny = cell.y + this.neighbor_positions[i][1];
            let neighbor_cell = this.grid.getNeighborCell(nx, ny);
            if (neighbor_cell && !neighbor_cell.visited && neighbor_cell.blocked) {
                neighbor_cells.push(neighbor_cell);
            }
        }
        return neighbor_cells;
    }

    growingTree = () => {
        const x = this.start_cell_coord.x;
        const y = this.start_cell_coord.y;
        let get_cell = true;
        let prev_cells = [];
        let current_cell = this.grid.getCell(x, y);

        while (get_cell) {
            current_cell.visited = true;
            let neighbor_cells = this.getNeighborCells(current_cell);
            if (neighbor_cells.length > 0) {
                let neighbor_cell = neighbor_cells[randomRange(0, neighbor_cells.length)];
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
                let new_cell = this.grid.getCell(n_x, n_y);
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

    generate = () => {
        this.growingTree();
        this.data = {};
        this.generators.forEach(
            generator => {
                this.data = new generator
                    .generator()
                    .generate(
                        generator.options,
                        this.grid,
                        this.data
                    );
            }
        );
    }
}

module.exports = NodeMazeGenerator;