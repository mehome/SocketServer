
var repeatTime = 3000 * 2;
var PORT = 6969;
var HOST = '127.0.0.1';

var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var con = require('./CONST');

var users = {};
var usocket = {};
var onlineCount = 0;

function handler(req, res) {
    console.log("http请求");
    res.writeHead(200);
    res.end("data");

}
app.listen(PORT);
//创建socket事件
io.on('connection', function (socket) {
    //监听用户加入
    var username;
    console.log("one user login");
    socket.on(con.LOGIN, function (obj) {
        if (obj) {
            username = obj.username;
            users[username] = username;
            usocket[username] = socket;
            console.log("user " + username + "  进入了房间");
            usocket[username].emit(con.LOGIN, "成功");
        } else {
            console.log("no username found");
        }
    })

    socket.on(con.GETCONTACTS, function () {
        io.emit(con.GETCONTACTS, { "contacts": users });
        console.log("服务器端发送联系人:" + users);
    })

    socket.on('disconnect', function () {
        io.emit('user disconnected');
        delete users[username];
        delete usocket[username];
        console.log(username + "离开了房间");
    });
});

function sendUseMsg(data) {
    if (data.to in usocket) {
        console.log('================')
        console.log('to' + data.to, data);
        usocket[data.to].emit('to' + data.to, data);
        usocket[data.user].emit('to' + data.user, data);
        console.log('================')
    }
}

console.log("running ");