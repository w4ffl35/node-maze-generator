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
        const minRooms = parseInt(this.options.minRooms) || 1;
        const maxRooms = parseInt(this.options.maxRooms) || 8;
        const minRoomWidth = parseInt(this.options.minRoomWidth) || 1;
        const minRoomHeight = parseInt(this.options.minRoomHeight) || 1;
        const maxRoomWidth = parseInt(this.options.maxRoomWidth) || 8;
        const maxRoomHeight = parseInt(this.options.maxRoomHeight) || 8;
        let totalRooms = this.options.totalRooms || Random.range(minRooms, maxRooms);
        for (let z = 0; z < this.data.grid.total_floors; z++) {
            for (let i = 0; i < totalRooms; i++) {
                let roomWidth = Random.range(minRoomWidth, maxRoomWidth);
                let roomHeight = Random.range(minRoomHeight, maxRoomHeight);
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
