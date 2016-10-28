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
  new VideoVimeo(1, "187766126_th.jpg", "187766126", "Như Phút Ban Đầu - Noo Phước Thịnh", "Vì em anh như người điên mất trí. Vì em anh như chẳng còn biết nghĩ suy. Vì anh đã trót lỡ đắm say em không bận tâm mai sau thế nào..."),
  new VideoVimeo(2, "187759316_th.jpg", "187759316", "Chúng ta không thuộc về nhau - Sơn Tùng MTP", "Niềm tin đã mất, giọt nước mắt cuốn kí ức anh chìm sâu. Tìm về nơi đâu, cô đơn đôi chân lạc trôi giữa bầu trời..."),
  new VideoVimeo(3, "187781709_th.jpg", "187781709", "Gửi Anh Xa Nhớ - Bích Phương", "Anh xa nhớ anh có khỏe không. Em lâu lắm không viết thư tay..."),
  new VideoVimeo(4, "187780178_th.jpg", "187780178", "We Don't Talk Anymore-Charlie-Puth vs Selena Gomez", "We Don't Talk Anymore, We Don't Talk Anymore..."),
  new VideoVimeo(5, "187795671_th.jpg", "187795671", "Talk Love - K.Will", " Descendants Of The Sun OST "),
  new VideoVimeo(6, "188116372_th.jpg", "188116372", "Always - Yoon Mi Rae ", " Descendants Of The Sun OST "),
  new VideoVimeo(7, "188116347_th.jpg", "188116347", "Everytime - EXO’s Chen & Punch", " Descendants Of The Sun OST"),
  new VideoVimeo(8, "188116375_th.jpg", "188116375", "You are my everything - Gumm", " Descendants Of The Sun OST"),
  new VideoVimeo(9, "188116374_th.jpg", "188116374", "This Love - Davichi", " Descendants Of The Sun OST"),
  new VideoVimeo(10, "188116373_th.jpg", "188116373", "I Do - 911 ", "My whole world changed from the moment I met you. And it would never be the same..."),
  new VideoVimeo(11, "188236513_th.jpg", "188236513", "Really Love You - Noo Phước Thịnh", " Dịu dàng ngày em đến. Nồng nàn yêu thương. Xua tan cô đơn trong lòng anh..."),
  new VideoVimeo(12, "188116625_th.jpg", "188116625", "Mãi Mãi Bên Nhau - Noo Phước Thịnh", " Em là ai giữa cuộc đời này. Em từ đâu bước tới nơi đây..."),
  new VideoVimeo(13, "188274119_th.jpg", "188274119", "Once Again - Kim Na Young & Mad Clown", "  Descendants Of The Sun OST"),
  new VideoVimeo(14, "188596314_th.jpg", "188596314", "You Were Born To Be Loved", " Taengoo ah"),
  new VideoVimeo(15, "188776618_th.jpg", "188776618", "Mashup-12 bài hot", " Lynkee"),
  new VideoVimeo(15, "189267563_th.jpg", "189267563", "Cause I Love You - Noo Phước Thịnh ", "Giờ người đang bước bên ai không phải anh. Giờ người đang bên ai kia không phải anh..."),
  new VideoVimeo(15, "189267301_th.jpg", "189267301", "Thương - Karik ft Uyên Pím", "Lạ, yêu, hi sinh rồi thương. Tình cảm luôn dẫn dắt ta đến những cảm xúc vô thường"),
  new VideoVimeo(15, "189267241_th.jpg", "189267241", "Đếm Ngày Xa Em - Only C ft. Lou Hoàng", "Nào đâu, chẳng được bấy lâu. Rồi phải xa cách nhau...."),
  new VideoVimeo(15, "189267234_th.jpg", "189267234", "ERIK from ST.319 - Sau Tất Cả", "Sau tất cả, mình lại trở về với nhau. Tựa như chưa bắt đầu, tựa như ta vừa mới quen..."),
  new VideoVimeo(15, "189267207_th.jpg", "189267207", "Yêu Một Người Có Lẽ - Lou Hoàng - Miu Lê ", "Giả vờ như tất cả mọi thứ chưa xảy ra với anh. Lập lờ những thứ ngay trước mắt anh chẳng hề so sánh..."),
  new VideoVimeo(15, "189267206_th.jpg", "189267206", "Giá Như Anh Lặng Im - OnlyC ft. Lou Hoàng ft. Quang Hùng ", "Vì sao anh cứ đắm chìm lệ hoen cay khóe mi gió đông sang lạnh buốt con tim. Những ngọt ngào xưa nay cũng chỉ là kỉ niệm GIÁ NHƯ ANH LẶNG IM"),
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
