const Generator = require('./generators/generator.js');
const NodeMazeGenerator = require('./generators/maze.js');
const Renderer = require('./renderer.js');
const RoomGenerator = require('./generators/room.js');
new Renderer(new Generator([
    {
        generator: NodeMazeGenerator,
        options: {
            width: 20,
            height: 20,
        }
    },
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
]));
