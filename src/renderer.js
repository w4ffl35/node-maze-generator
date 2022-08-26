class Renderer {
    constructor(generator) {
        for (let z = 0; z < generator.data.grid.total_floors; z++) {
            console.log(`Floor ${z}`);
            for (let y = 0; y < generator.data.grid.height; y++) {
                let row = '';
                for (let x = 0; x < generator.data.grid.width; x++) {
                    let f = generator.data.grid.cells[z][y][x].blocked ? '\u2588' : '\u2591';
                    if (generator.data.grid.cells[z][y][x].stairs) {
                        f = '\u2699';
                    }
                    row += f;
                }
                console.log(row);
            }
        }
    }
}

module.exports = Renderer;