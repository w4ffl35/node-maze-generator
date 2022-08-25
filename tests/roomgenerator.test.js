const MazeGenerator = require('../src/mazegenerator.js');
const RoomGenerator = require('../src/roomgenerator.js');

describe("Room Generator Tests", () => {
    let mazeGenerator = null;
    beforeAll(() => {
        mazeGenerator = new MazeGenerator({
            width: 10,
            height: 10,
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
        });
        mazeGenerator.generate();
    });

    test('Room generator has rooms key in object', () => {
        expect(Object.keys(mazeGenerator.data).includes('rooms')).toBeTruthy();
    });
});