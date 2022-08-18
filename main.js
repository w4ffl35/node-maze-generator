const NodeMazeGenerator = require('./mazegenerator.js');
const Renderer = require('./renderer.js');
const RoomGenerator = require('./roomgenerator.js');
const R = new Renderer(new NodeMazeGenerator({
    width: 20,
    height: 20,
    generators: [
        RoomGenerator
    ]
}));
console.log("rendering...");
R.render();
