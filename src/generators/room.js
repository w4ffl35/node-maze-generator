const {Random} = require('../utils.js');

class RoomGenerator {
    /**
     * @class RoomGenerator
     * @classdesc Generates rooms for a cells in a grid.
     * @param {Object} data - The data object to use.
     * @param {Object} options - The options object to use.
     * @param {Number} options.minRooms - The minimum number of rooms to generate.
     * @param {Number} options.maxRooms - The maximum number of rooms to generate.
     * @param {Number} options.minRoomWidth - The minimum width of a room.
     * @param {Number} options.minRoomHeight - The minimum height of a room.
     * @param {Number} options.maxRoomWidth - The maximum width of a room.
     * @param {Number} options.maxRoomHeight - The maximum height of a room.
     * @param {Number} options.totalRooms - The total number of rooms to generate.
     */
    constructor(data, options) {
        this.options = options
        this.data = data||{};
        this.data.rooms = [];
        const minRooms = parseInt(options.minRooms) || 1;
        const  maxRooms = parseInt(options.maxRooms) || 8;
        this.minRoomWidth = parseInt(options.minRoomWidth) || 1;
        this.minRoomHeight = parseInt(options.minRoomHeight) || 1;
        this.maxRoomWidth = parseInt(options.maxRoomWidth) || 8;
        this.maxRoomHeight = parseInt(options.maxRoomHeight) || 8;
        this.totalRooms = this.options.totalRooms || Random.range(minRooms, maxRooms);
        this.generate();
    }

    generate = () => {
        for (let z = 0; z < this.data.grid.total_floors; z++) {
            for (let i = 0; i < this.totalRooms; i++) {
                let roomWidth = Random.range(this.minRoomWidth, this.maxRoomWidth);
                let roomHeight = Random.range(this.minRoomHeight, this.maxRoomHeight);
                let room = {
                    x: Random.range(0, this.data.grid.width - roomWidth),
                    y: Random.range(0, this.data.grid.height - roomHeight),
                    width: roomWidth,
                    height: roomHeight
                };
                for (let y = room.y; y < room.y + room.height; y++) {
                    for (let x = room.x; x < room.x + room.width; x++) {
                        if (this.data.grid.isInNavigationBounds(x, y)) {
                            this.data.grid.unblockCell(x, y, z);
                        }
                    }
                }
                this.data.rooms.push(room);
            }
        }
    }
}

module.exports = RoomGenerator;
