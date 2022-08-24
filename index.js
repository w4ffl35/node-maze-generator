const NodeMazeGenerator = require('./src/mazegenerator.js');
const Renderer = require('./src/renderer.js');
const Cell = require('./src/cell.js');
const Grid = require('./src/grid.js');
const RoomGenerator = require('./src/roomGenerator.js');

module.exports = {
    generators: {
        maze: NodeMazeGenerator,
        room: RoomGenerator
    },
    renderer: Renderer,
    cell: Cell,
    grid: Grid
}