const NodeMazeGenerator = require('./mazegenerator.js');
const Renderer = require('./renderer.js');
const R = new Renderer(new NodeMazeGenerator(20, 20));
R.render();
