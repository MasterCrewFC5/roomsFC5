const User = function (io, app, socket){
    this.io = io;
    this.app = app;
    this.socket = socket;

    this.handler = {
        disconnect: disconnect.bind(this)
    }
};

function disconnect() {
    console.log('User disconnect');
}

module.exports = User;