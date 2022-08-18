class Renderer {
    constructor(mazegenerator) {
        this.mazegenerator = mazegenerator;
        this.mazegenerator.generate();
    }

    render = () => {
        for (let y = 0; y < this.mazegenerator.height; y++) {
            let row = '';
            for (let x = 0; x < this.mazegenerator.width; x++) {
                row += this.mazegenerator.cells[y][x].blocked ? '\u2588' : '\u2591';
            }
            console.log(row);
        }
    }
}

module.exports = Renderer;