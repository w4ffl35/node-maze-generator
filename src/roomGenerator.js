const randomRange = require('./utils.js').randomRange;

class RoomGenerator {
    generate = (options, grid) => {
        let rooms = [];
        const minRooms = parseInt(options.minRooms) || 1;
        const maxRooms = parseInt(options.maxRooms) || 8;
        const minRoomWidth = parseInt(options.minRoomWidth) || 1;
        const minRoomHeight = parseInt(options.minRoomHeight) || 1;
        const maxRoomWidth = parseInt(options.maxRoomWidth) || 8;
        const maxRoomHeight = parseInt(options.maxRoomHeight) || 8;
        let totalRooms = options.totalRooms || randomRange(minRooms, maxRooms);
        for (let i = 0; i < totalRooms; i++) {
            let roomWidth = randomRange(minRoomWidth, maxRoomWidth);
            let roomHeight = randomRange(minRoomHeight, maxRoomHeight);
            let room = {
                x: randomRange(0, grid.width - roomWidth),
                y: randomRange(0, grid.height - roomHeight),
                width: roomWidth,
                height: roomHeight
            };
            rooms.push(room);
        }
        for (let i = 0; i < totalRooms; i++) {
            let room = rooms[i];
            for (let y = room.y; y < room.y + room.height; y++) {
                for (let x = room.x; x < room.x + room.width; x++) {
                    grid.unblockCell(x, y);
                }
            }
        }
    }
}

module.exports = RoomGenerator;
