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

    test('Maze Generator has correct width', () => {
        expect(mazegen.width).toEqual(WIDTH);
    });

    test('Maze Generator has correct height', () => {
        expect(mazegen.height).toEqual(HEIGHT);
    });

    test('Maze Generator has correct number of cells', () => {
        expect(mazegen.cells.length).toEqual(WIDTH);
        expect(mazegen.cells[0].length).toEqual(HEIGHT);
    });
});