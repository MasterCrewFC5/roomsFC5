const Rooms = function (io, app, socket) {
    this.io = io;
    this.app = app;
    this.socket = socket;

    this.handler = {
        searchRoom: searchRoom.bind(this),
    }
};

function searchRoom() {
    var roomName = 'room-' + this.app.counter;
    var room = this.io.sockets.adapter.rooms[roomName];
    if(undefined === room ) {       // First co
        this.socket.join(roomName);
    }else if(room && room.length < 2){  // Existing room with 1 user
        this.socket.join(roomName);
        this.io.sockets.in(roomName).emit('roomFull', roomName);
    } else{             // None room available
        this.app.counter++;
        this.socket.join('room-'+this.app.counter)
    }
    this.socket.emit('roomFind', roomName);
    this.io.sockets.in(roomName).emit('newUserRoom', {});

}


module.exports = Rooms;