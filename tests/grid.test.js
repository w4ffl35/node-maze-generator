const Grid = require('../src/grid.js');

describe("Grid Tests", () => {
    let grid = null;
    const WIDTH = 10;
    const HEIGHT = 10;

    beforeAll(() => {
        grid = new Grid({
            width: 10,
            height: 10
        });
    });

    test('Maze Generator is created', () => {
        expect(grid).toBeDefined();
    });

    test('Maze Generator has correct width', () => {
        expect(grid.width).toEqual(WIDTH);
    });

    test('Maze Generator has correct height', () => {
        expect(grid.height).toEqual(HEIGHT);
    });

    test('Maze Generator has correct number of cells', () => {
        expect(grid.cells.length).toEqual(WIDTH);
        expect(grid.cells[0].length).toEqual(HEIGHT);
    });
});