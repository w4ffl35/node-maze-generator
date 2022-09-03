class Renderer {
    constructor(generator) {
        for (let z = 0; z < generator.data.grid.total_floors; z++) {
            console.log(`Floor ${z}`);
            for (let y = 0; y < generator.data.grid.height; y++) {
                let row = '';
                for (let x = 0; x < generator.data.grid.width; x++) {
                    let cell = generator.data.grid.cells[z][y][x];
                    let f = cell.blocked ? '\u2588' : '\u2591';
                    if (cell.stairs) {
                        if (cell.stairs.direction === 'up') {
                            f = '\u25B2';
                        }
                        else {
                            f = '\u25BC';
                        }
                    }
                    row += f;
                }
                console.log(row);
            }
        }
    }
}

module.exports = Renderer;