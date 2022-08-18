# Node Maze Generator

Generate perfect mazes with Node using a growing tree algorithm.

## Installation

    npm install node-maze-generator

## Usage

    const nmg = require('node-maze-generator');
    const generator = new nmg.generator(10, 10);
    const renderer = new nmg.renderer(generator);
    renderer.render();

## Contributing

Fork the repository and make a pull request.

## License

[MIT](LICENSE)

## Tests

    npm run test

## Contributors

  - [@w4ffl35](https://github.com/w4ffl35)