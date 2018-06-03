const Rooms = function (io, app, socket) {
    this.io = io;
    this.app = app;
    this.socket = socket;

    this.handler = {
        searchRoom: searchRoom.bind(this),
        messageRoom: messageRoom.bind(this)
    }
};

function searchRoom() {
    console.log('search room')
    if(true) { //check length room-32 for example
        this.socket.join('room-' + this.app.counter)
    }else{
        this.app.counter++;
        this.socket.join('room-'+this.app.counter)
    }
}

function messageRoom(room) {
    const idRoom = room.id;
    const message = room.message;
    this.io.sockets.in(idRoom).emit('message', message);
}


module.exports = Rooms;