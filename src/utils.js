class Random {
    static _seed;

    static seed = (seed) => {
        Random._seed = parseInt(seed) || Math.random();
    }

    static next() {
        let x = Math.sin(Random._seed) * 10000;
        Random._seed = x - Math.floor(x);
        return x - Math.floor(x);
    }

    static range = (min, max) => {
        return Math.floor(Random.next() * (max - min)) + min;
    }
}

module.exports = {
    Random: Random
};

