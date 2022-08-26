const {Random} = require('../utils');

class Generator {
    constructor(generators, seed) {
        Random.seed(seed);
        this.data = {};
        generators.forEach(
            generator => {
                const gen = new generator.generator(this.data, generator.options);
                this.data = gen.data;
            }
        );
    }
}

module.exports = Generator;
