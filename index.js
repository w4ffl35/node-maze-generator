const Generator = require('./src/generators/generator.js');
const MazeGenerator = require('./src/generators/maze.js');
const RoomGenerator = require('./src/generators/room.js');
const StairGenerator = require('./src/generators/stairs.js');
const Renderer = require('./src/renderer.js');
const Cell = require('./src/cell.js');
const Grid = require('./src/grid.js');

module.exports = {
    generators: {
        generator: Generator,
        maze: MazeGenerator,
        room: RoomGenerator,
        stairs: StairGenerator
    },
    renderer: Renderer,
    cell: Cell,
    grid: Grid
}