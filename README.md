# Node Maze Generator

[![CodeQL](https://github.com/w4ffl35/node-maze-generator/actions/workflows/codeql.yml/badge.svg)](https://github.com/w4ffl35/node-maze-generator/actions/workflows/codeql.yml) [![Node.js Package](https://github.com/w4ffl35/node-maze-generator/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/w4ffl35/node-maze-generator/actions/workflows/npm-publish.yml)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

Generate perfect mazes with Node using a growing tree algorithm.

## Installation

    npm install node-maze-generator

## Usage

    const nmg = require('node-maze-generator');
    const generator = new nmg.generator({width: 10, height: 10});
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
