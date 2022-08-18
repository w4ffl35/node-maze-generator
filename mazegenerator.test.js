const MazeGenerator = require('./mazegenerator.js');

describe("Maze Generator Tests", () => {
    let mazegen = null;
    const WIDTH = 10;
    const HEIGHT = 10;

    beforeAll(() => {
        mazegen = new MazeGenerator(WIDTH, HEIGHT);
    });

    test('Maze Generator is created', () => {
        expect(mazegen).toBeDefined();
    });
});