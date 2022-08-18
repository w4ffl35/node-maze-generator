const MazeGenerator = require('./mazegenerator.js');

describe("Maze Generator Tests", () => {
    let mazeGenerator = null;
    beforeAll(() => {
        mazeGenerator = new MazeGenerator({
            width: 10,
            height: 10
        });
        mazeGenerator.generate();
    });

    test('Maze Generator is created', () => {
        expect(mazeGenerator).toBeDefined();
    });

    test('Maze Generator has grid', () => {
        expect(mazeGenerator.grid).toBeDefined();
    });
});