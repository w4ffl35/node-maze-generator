const NodeMazeGenerator = require('./mazegenerator.js');
const Renderer = require('./renderer.js');
const Cell = require('./cell.js');
const Grid = require('./grid.js');
const RoomGenerator = require('./roomgenerator.js');

module.exports = {
    generators: {
        maze: NodeMazeGenerator,
        room: RoomGenerator
    },
    renderer: Renderer,
    cell: Cell,
    grid: Grid
}