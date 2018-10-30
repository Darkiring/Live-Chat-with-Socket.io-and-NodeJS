var socket = io.connect('http://18.223.185.176:8080', { 'forceNew': true });

socket.on('messages', (data) => {
    render(data);
});

var globalID = 1;

render = (data) => {
    var html = data.map((message) => {
        return(`
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');
    
    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

addMessage = (e) => {
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value,
    };

    document.getElementById('nickname').disable=true;
    document.getElementById('text').value = ' ';
    socket.emit('add-message', message);
    return false;
}
