const NodeMazeGenerator = require('./src/generators/maze.js');
const Renderer = require('./src/renderer.js');
const Cell = require('./src/cell.js');
const Grid = require('./src/grid.js');
const RoomGenerator = require('./src/generators/room.js');

module.exports = {
    generators: {
        maze: NodeMazeGenerator,
        room: RoomGenerator
    },
    renderer: Renderer,
    cell: Cell,
    grid: Grid
}