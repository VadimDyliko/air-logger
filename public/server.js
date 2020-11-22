(function () {
    var app = require('express')();
    var http = require('http').createServer(app);
    var io = require('socket.io')(http);
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

    let server = http.listen(4000, function () {
        console.log('Express server listening on port ' + server.address().port);
    });

    module.exports = app;
})();
