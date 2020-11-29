const DEFAULT_PORT = 4000;

function initServer(port) {
    const app = require('express')();
    const http = require('http').createServer(app);
    const io = require('socket.io')(http);
    const express = require('express');
    const path = require('path');
    const bodyParser = require('body-parser');

    app.use(express.static(__dirname));
    app.use(express.static(path.join(__dirname, '../build')));
    app.use(bodyParser.json());

    io.on('connection', socket => {
        socket.on('debugLog', debugData => {
            io.sockets.emit('debugLog', debugData);
        });
    });

    app.get('/ui', function (req, res) {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });

    http.listen(port || DEFAULT_PORT);
    module.exports = app;
}

module.exports = initServer;
