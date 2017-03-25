var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;
var repeatTime = 3000 * 2;

net.createServer(function (sock) {
    console.log('CONNECTED:' + sock.remoteAddress + ":" + sock.remotePort);
    // setInterval(function () {
    //     console.log("发送数据");
    //     sock.write("你已经连接\nbye");
    // }, repeatTime);

    sock.on('data', function (data) {
        console.log("接收消息成功")
        sock.write("给你的消息\n");
    });

    sock.on('close', function (data) {
        console.log('CLOSED:' + sock.remoteAddress + data);
    })
}).listen(PORT);

console.log('Server listening on ' + HOST + ":" + PORT);

