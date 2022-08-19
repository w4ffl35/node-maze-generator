# Node Maze Generator

[![CodeQL](https://github.com/w4ffl35/node-maze-generator/actions/workflows/codeql.yml/badge.svg)](https://github.com/w4ffl35/node-maze-generator/actions/workflows/codeql.yml) [![Node.js Package](https://github.com/w4ffl35/node-maze-generator/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/w4ffl35/node-maze-generator/actions/workflows/npm-publish.yml)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

Generate perfect mazes with Node using a growing tree algorithm.

## Installation

    npm install node-maze-generator

## Usage

    const nmg = require('node-maze-generator');
    const generator = new nmg.generators.maze({width: 10, height: 10});
    const renderer = new nmg.renderer(generator);
    renderer.render();

### Generator classes

Generator classes can be passed as an optional array of objects to the maze generator.

The shape of this array is as follows:

        [
            {
                generator: <generator class>,
                options: <options object>
            },
            ...
        ]

Generator classes must have a `generate` function.

`NodeMazeGenerator` will iterate over each generator class, instantiate it and call `generate` on each object in the 
order they are provided.

**Example**

The following example shows how to generate a maze with rooms using the provided room generator.

(also see main.js)

    const nmg = require('node-maze-generator');
    const mazeGenerator = new nmg.generators.maze({ generators: [
        {
            generator: nmg.generators.room,
            options: {
                ...
            }
        }
    ]});

---

#### Custom generator classes

The `NodeMazeGenerator` class object will be passed to any generators given in the constructor.
In this way it is possible to access the maze generator grid data

    class SomeGenerator {
        generate = (options, grid) => {
            // do something with grid object
        }
    }

---

#### Optional arguments

NodeMazeGenerator takes the following optional arguments:

    {
        width: <number>,
        height: <number>,
        cell_class: <class used to represent a cell on the grid>,
        start_x: <starting x position on the grid>,
        start_y: <starting y position on the grid>,
        generators: <array of generator objects>
    }

RoomGenerator takes the following optional arguments:

    {
        minRooms: <minimum number of rooms>,
        maxRooms: <maximum number of rooms>,
        minRoomWidth: <minimum width of a room>,
        minRoomHeight: <minimum height of a room>,
        maxRoomWidth: <maximum width of a room>,
        maxRoomHeight: <maximum height of a room>
    }
    

## Contributing

Fork the repository and make a pull request.

## License

[MIT](LICENSE)

## Tests

    npm run test

## Contributors

  - [@w4ffl35](https://github.com/w4ffl35)
