const NodeMazeGenerator = require('./mazegenerator.js');
const Renderer = require('./renderer.js');
const R = new Renderer(new NodeMazeGenerator({
    width: 20,
    height: 20
}));
console.log("rendering...");
R.render();
