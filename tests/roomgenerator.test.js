const Generator = require('../src/generators/generator.js');
const MazeGenerator = require('../src/generators/maze.js');
const RoomGenerator = require('../src/generators/room.js');

describe("Room Generator Tests", () => {
    beforeAll(() => {
        this.generator = new Generator([
            {
                generator: MazeGenerator,
                options: {
                    width: 10,
                    height: 10
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
        ]);
    });

    test('Room generator has rooms key in object', () => {
        expect(Object.keys(this.generator.data).includes('rooms')).toBeTruthy();
    });

    test('Maze Generator has grid', () => {
        expect(this.generator.data.rooms).toBeDefined();
    });
});