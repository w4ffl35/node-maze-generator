const NodeMazeGenerator = require('./mazegenerator.js')

let mg = new NodeMazeGenerator(10, 10);
mg.generate();
console.log(mg);