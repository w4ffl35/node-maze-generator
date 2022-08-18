const NodeMazeGenerator = require('./mazegenerator.js')

let mg = new NodeMazeGenerator(20, 20);
mg.generate();

// iterate over mg.cells and print out the maze with ascii characters
for (let y = 0; y < mg.height; y++) {
    let row = '';
    for (let x = 0; x < mg.width; x++) {
        // create row using unicode characters
        row += mg.cells[y][x].blocked ? '\u2588' : '\u2591';
    }
    console.log(row);
}