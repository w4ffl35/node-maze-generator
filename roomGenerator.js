class RoomGenerator {
    generate = (mazeGenerator) => {
        let rooms = [];
        const minRooms = parseInt(mazeGenerator.options.minRooms) || 1;
        const maxRooms = parseInt(mazeGenerator.options.maxRooms) || 8;
        const minRoomWidth = parseInt(mazeGenerator.options.minRoomWidth) || 1;
        const minRoomHeight = parseInt(mazeGenerator.options.minRoomHeight) || 1;
        const maxRoomWidth = parseInt(mazeGenerator.options.maxRoomWidth) || 8;
        const maxRoomHeight = parseInt(mazeGenerator.options.maxRoomHeight) || 8;
        let totalRooms = mazeGenerator.options.totalRooms || mazeGenerator.randomRange(minRooms, maxRooms);
        for (let i = 0; i < totalRooms; i++) {
            let roomWidth = mazeGenerator.randomRange(minRoomWidth, maxRoomWidth);
            let roomHeight = mazeGenerator.randomRange(minRoomHeight, maxRoomHeight);
            let room = {
                x: mazeGenerator.randomRange(0, mazeGenerator.grid.width - roomWidth),
                y: mazeGenerator.randomRange(0, mazeGenerator.grid.height - roomHeight),
                width: roomWidth,
                height: roomHeight
            };
            rooms.push(room);
        }
        for (let i = 0; i < totalRooms; i++) {
            let room = rooms[i];
            for (let y = room.y; y < room.y + room.height; y++) {
                for (let x = room.x; x < room.x + room.width; x++) {
                    mazeGenerator.grid.unblockCell(x, y);
                }
            }
        }
    }
}

module.exports = RoomGenerator;
