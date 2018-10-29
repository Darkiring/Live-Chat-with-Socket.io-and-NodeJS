var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('Client'));

app.get('/hola-mundo', (red, res) => {
    res.status(200).send('Hola mundo desde una ruta');
})

var globalID = 1;
var messages = [{
    id: globalID,
    text: 'Bienvenido al chat privado de Socket.io y NodeJS de DarkBlack...',
    nickname: 'Bot - ChatBot'
}];

io.on('connection', (socket) => {
    console.log('El nodo con IP: ' + socket.handshake.address + ' se ha conectado...');
    socket.emit('messages', messages);
    socket.on('add-message', (data) => {
            dataNew = {
                id: globalID += 1,
                nickname: data.nickname,
                text: data.text                
            };
        messages.push(dataNew);
        io.sockets.emit('messages', messages);
    });
})

server.listen(8080, () => console.log('Servidor esta funcionando en http://18.223.185.176'));
