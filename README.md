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

Generator classes can be passed as an optional array to the maze generator. 

As long these classes have a `generate` method the `NodeMazeGenerator` class will run the classes in the order 
they are provided.

**Example**

The following example shows how to generate a maze with rooms using the provided room generator. 

    const nmg = require('node-maze-generator');
    const mazeGenerator = new nmg.generators.maze({ generators: [
        nmg.generators.room
    ]});

The `NodeMazeGenerator` class object will be passed to any generators given in the constructor.
In this way it is possible to access the maze generator grid data

    class SomeGenerator {
        generate = (mazeGenerator) => {
            // do something with mazeGenerator.grid
        }
    }

NodeMazeGenerator takes the following options

    

## Contributing

Fork the repository and make a pull request.

## License

[MIT](LICENSE)

## Tests

    npm run test

## Contributors

  - [@w4ffl35](https://github.com/w4ffl35)
