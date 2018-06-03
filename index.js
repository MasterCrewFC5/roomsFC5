const express = require('express');
const serv = express();
const server = require('http').Server(serv);
const io = require('socket.io')(server);

const User = require('./eventHandlers/User');
const Rooms = require('./eventHandlers/Rooms');

server.listen(3000, function () {
    console.log('Server up at 3000');
});

const app = {
    allSockets: [],
    counter: 0
};

/**
 * Warning /!\
 * io concern all sockets, all users
 * socket concern individual users
 */
io.on('connection', function (socket) {
    console.log('New connection ', new Date(), socket.server.eio.clientsCount, socket.server.eio.clients);

    const eventHandlers = {
        user: new User(io, app, socket),
        rooms: new Rooms(io, app, socket),
    };

    for (const category in eventHandlers) {
        var handler = eventHandlers[category].handler;
        for (const event in handler) {
            socket.on(event, handler[event]);
        }
    }

    app.allSockets.push(socket);

    // socket.on('messages', function (data) {
    //     console.log('test 2', new Date());
    //     io.emit('customEmit', data);
    // });
    //
    // socket.on('disconnect', function () {
    //     console.log('User disconnect')
    //
    // });
    //
    // socket.on('customEmit', function () {
    //     socket.emit('customEmit', "prout")
    // })
});