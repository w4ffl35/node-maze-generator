# Node Maze Generator

[![CodeQL](https://github.com/w4ffl35/node-maze-generator/actions/workflows/codeql.yml/badge.svg)](https://github.com/w4ffl35/node-maze-generator/actions/workflows/codeql.yml) [![Node.js Package](https://github.com/w4ffl35/node-maze-generator/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/w4ffl35/node-maze-generator/actions/workflows/npm-publish.yml)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

Generate perfect mazes with Node using a growing tree algorithm.

        ████████████████████
        █░██░░█░░░░░░░░░░███
        █░█░░░░░█░███░██████
        █░░░░░░░█░██░░█░░░██
        ███░░░░░█░█████░█░██
        █░░░░░░░░░█░░░░░█░██
        █░█░░░░░███░█████░██
        █░█░░░░░░░░░███░░░██
        █░█░█████████░█░█░██
        █░█░░░░░█░░░█░█░████
        █░█████░█░█░█░█░████
        █░██░░░░░░░░░░░░░░██
        █░████████░░░░░░░░██
        █░░░░░█░░░░░░░░░░░██
        █████░█░██░░░░░░░░██
        ███░░░███░░░░░░░░░██
        █░█░█████░░░░░░░░░██
        █░░░░░░░░░█░░░░░░░██
        █░░░░░█████░░░░░░░██
        ████████████████████
        
Maze.js and room.js data structures:

        {
            grid: [
              [
                Cell {
                  x: 0,
                  y: 0,
                  exits: [],
                  blocked: true,
                  displayed: false,
                  visited: false
                },
                ...
              ]
            ]
            rooms: [
                Room {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                }
            ]
        }

## Installation

    npm install node-maze-generator

---

## Quick use

    const nmg = require('node-maze-generator');
    const generator = new nmg.generators.maze({}, {width: 10, height: 10});
    const renderer = new nmg.renderer(generator);

---

### Generator classes

Generator classes can be passed as an optional array of objects to the maze generator.

The shape of this data structure is as follows:

        [
            {
                generator: <generator class>,
                options: <options object>
            },
            ...
        ]

`Generator` (`src/generator.js`) will iterate over each generator class and instantiate it.

**Example**

The following example shows how to generate a maze with rooms using the provided room generator.

(also see main.js)

    const nmg = require('node-maze-generator');
    const generator = new nmg.generators.generator([
        {
            generator: nmg.generators.maze,
            options: {
                ...
            },
            generator: nmg.generators.room,
            options: {
            ...
            }
        }
    ]});
    new nmg.renderer(generator);

---

#### Custom generator classes

Custom generators should match the following pattern.

    class SomeGenerator {
        constructor (data: {}, options: {}) {
            // do something with the data object
            this.data.someProperty = 'someValue';
        }
    }

See `src/room.js` and `src/maze.js` for complete examples.

---

#### Optional arguments

see `src/maze.js` and `src/room.js` for a list of option arguments that each class takes.
    
---

## Development

See [CONTRIBUTING.md](CONTRIBUTING.md)

---

## License

[MIT](LICENSE)

---

## Tests

Run unit tests

    npm run test

Command line maze generation and rendering
    
    npm run start

![img_2.png](sample_maze_output.png)

---

## Contributors

  - [@w4ffl35](https://github.com/w4ffl35)
