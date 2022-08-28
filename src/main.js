const Generator = require('./generators/generator.js');
const NodeMazeGenerator = require('./generators/maze.js');
const Renderer = require('./renderer.js');
const RoomGenerator = require('./generators/room.js');
const StairGenerator = require('./generators/stairs.js');
const {Random} = require("./utils");
const SEED = 100;
const WIDTH = 21;
const HEIGHT = 21;
const FLOORS = 2;
const MIN_ROOMS = 1;
const MAX_ROOMS = 8;
const MIN_ROOM_WIDTH = 1;
const MIN_ROOM_HEIGHT = 1;
const MAX_ROOM_WIDTH = 8;
const MAX_ROOM_HEIGHT = 8;

Random.seed(SEED);

new Renderer(new Generator([
    {
        generator: NodeMazeGenerator,
        options: {
            width: WIDTH,
            height: HEIGHT,
            floors: FLOORS
        }
    },
    {
        generator: RoomGenerator,
        options: {
            minRooms: MIN_ROOMS,
            maxRooms: MAX_ROOMS,
            minRoomWidth: MIN_ROOM_WIDTH,
            minRoomHeight: MIN_ROOM_HEIGHT,
            maxRoomWidth: MAX_ROOM_WIDTH,
            maxRoomHeight: MAX_ROOM_HEIGHT
        }
    },
    {
        generator: StairGenerator,
        options: {}
    }
], SEED));
