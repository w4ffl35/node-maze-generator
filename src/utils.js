/**
 * @class Random
 * @description A static class for generating random numbers.
 */
class Random {
    _seed = null;
    static _instance = null;

    static get instance() {
        if (Random._instance === null) {
            Random._instance = new Random();
        }
        return Random._instance;
    }

    constructor(seed) {
        this._seed = seed || Math.random();
    }

    /**
     * @function Random.seed
     * Sets the seed for the random number generator
     * @param seed
     * @returns {*|number}
     */
    static seed = (seed) => {
        Random.instance._seed = seed;
        return Random.instance._seed;
    }

    /**
     * @function Random.next
     * Returns a random number
     * @returns {number}
     */
    static next() {
        let x = Math.sin(Random.instance._seed) * 10000;
        Random.instance._seed = x - Math.floor(x);
        return x - Math.floor(x);
    }

    /**
     * @function Random.range
     * Returns a random number between min and max
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    static range = (min, max) => {
        return Math.floor(Random.next() * (max - min)) + min;
    }
}

module.exports = {
    Random: Random
};

