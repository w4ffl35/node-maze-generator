class Renderer {
    constructor(generator) {
        for (let y = 0; y < generator.data.grid.height; y++) {
            let row = '';
            for (let x = 0; x < generator.data.grid.width; x++) {
                row += generator.data.grid.cells[y][x].blocked ? '\u2588' : '\u2591';
            }
            console.log(row);
        }
    }
}

module.exports = Renderer;