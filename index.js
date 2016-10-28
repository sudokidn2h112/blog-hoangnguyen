var express = require("express");
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var bodyParser = require('body-parser');

app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views","./views");

var port = process.env.PORT || 6969;

var mang = [
  new VideoVimeo(1, "189274572_th.jpg", "189274572", "Như Phút Ban Đầu - Noo Phước Thịnh", "Vì em anh như người điên mất trí. Vì em anh như chẳng còn biết nghĩ suy. Vì anh đã trót lỡ đắm say em không bận tâm mai sau thế nào..."),
  new VideoVimeo(2, "189274612_th.jpg", "189274612", "Chúng ta không thuộc về nhau - Sơn Tùng MTP", "Niềm tin đã mất, giọt nước mắt cuốn kí ức anh chìm sâu. Tìm về nơi đâu, cô đơn đôi chân lạc trôi giữa bầu trời..."),
  new VideoVimeo(3, "189275112_th.jpg", "189275112", "Gửi Anh Xa Nhớ - Bích Phương", "Anh xa nhớ anh có khỏe không. Em lâu lắm không viết thư tay..."),
  new VideoVimeo(4, "189274543_th.jpg", "189274543", "We Don't Talk Anymore-Charlie-Puth vs Selena Gomez", "We Don't Talk Anymore, We Don't Talk Anymore..."),
  new VideoVimeo(5, "189274526_th.jpg", "189274526", "Talk Love - K.Will", " Descendants Of The Sun OST "),
  new VideoVimeo(6, "189274075_th.jpg", "189274075", "I Do - 911 ", "My whole world changed from the moment I met you. And it would never be the same..."),
  new VideoVimeo(7, "189274027_th.jpg", "189274027", "Mashup-12 bài hot", " Lynkee"),
  new VideoVimeo(8, "189274055_th.jpg", "189274055", "Thương - Karik ft Uyên Pím", "Lạ, yêu, hi sinh rồi thương. Tình cảm luôn dẫn dắt ta đến những cảm xúc vô thường"),
  new VideoVimeo(9, "189274000_th.jpg", "189274000", "ERIK from ST.319 - Sau Tất Cả", "Sau tất cả, mình lại trở về với nhau. Tựa như chưa bắt đầu, tựa như ta vừa mới quen..."),
  new VideoVimeo(10, "189273969_th.jpg", "189273969", "Yêu Một Người Có Lẽ - Lou Hoàng - Miu Lê ", "Giả vờ như tất cả mọi thứ chưa xảy ra với anh. Lập lờ những thứ ngay trước mắt anh chẳng hề so sánh..."),
  new VideoVimeo(11, "189275094_th.jpg", "189275094", "Con Đường Xưa Em Đi - Ngô Trung Quang", "Con đường xưa em đi, vàng lên mái tóc thề, ngỏ buồn dâng tái tê....")
];

function VideoVimeo(id, h, i, t, m){
  this.Id = id;
  this.HinhNho = h;
  this.IdVideo = i;
  this.TenVideo = t;
  this.MoTa = m;
}
//Server chatio
var connections = [];
var arrUsersOnline = [];
//Connect socketio
io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log("Connected: %s sockets connected ", connections.length);
    socket.on('client-send-username', function (data) {
    console.log('have signup with username: '+data);
    if(arrUsersOnline.indexOf(data) >=0){
      socket.emit('server-send-error', data);
    }else {
      arrUsersOnline.push(data);
      socket.username = data;
      socket.emit('server-send-user-and-hide-signup')
      io.sockets.emit('server-send-success', {id:socket.id, username: data});
    }
  })
  socket.on('client-send-message', function (data) {
    io.sockets.emit('server-send-message', {username: socket.username, msg: data});
  });
  socket.on('client-to-client', function (data) {
    io.to(data).emit('server-send-client', {username: socket.username});
  });

  //Disconnect socketio
    socket.on("disconnect", function(data){
      arrUsersOnline.splice(arrUsersOnline.indexOf(socket.id), 1);
      updateUsernames();
      connections.splice(connections.indexOf(socket), 1);
      console.log("Disconnected: %s sockets connected", connections.length);
    });
  //function update UserOnline
  function updateUsernames() {
    io.sockets.emit('get-user', { arrUsersOnline, userLeave: socket.username,message: "User " + socket.username + " just leave" , id: socket.id});
  }
});

app.get("/form", function(req, res){
  res.render("formThemVids");
});

app.get("/", function(req, res){
  res.render("index_dark", {danhsach:mang});
});

app.post("/upload", function(req, res){

});
server.listen(port, function (err) {
  if(err){
    console.log('Server start error: '+err);
  }else {
    console.log('Server is running at port: '+port);
  }
});
