class Generator {
    constructor(generators) {
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
