class Generator {
    constructor(generators) {
        this.data = {};
        this.generators = generators.map(
            generator => {
                const gen = new generator.generator(this.data, generator.options);
                this.data = gen.data;
                return gen;
            }
        );
    }

    generate = () => this.generators.forEach(
        generator => generator.generate()
    );
}

module.exports = Generator;
