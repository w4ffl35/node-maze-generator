const NodeMazeGenerator = require('./generators/maze.js');
const Renderer = require('./renderer.js');
const RoomGenerator = require('./generators/room.js');
const R = new Renderer(new NodeMazeGenerator({
    width: 20,
    height: 20,
    generators: [
        {
            generator: RoomGenerator,
            options: {
                minRooms: 1,
                maxRooms: 8,
                minRoomWidth: 1,
                minRoomHeight: 1,
                maxRoomWidth: 8,
                maxRoomHeight: 8
            }
        }
    ]
}));
console.log("rendering...");
R.render();
