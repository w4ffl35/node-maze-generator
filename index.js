const NodeMazeGenerator = require('./mazegenerator.js');
const Renderer = require('./renderer.js');
const Cell = require('./cell.js');

module.exports = {
    generator: NodeMazeGenerator,
    renderer: Renderer,
    cell: Cell
}