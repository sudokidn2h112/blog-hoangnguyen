var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("./views");
var port = process.env.PORT || 6969;
app.listen(port, function (err) {
  if(err){
    console.log('Server start error: '+err);
  }else {
    console.log('Server is running at port: '+port);
  }
});

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
  new VideoVimeo(14, "188596314_th.jpg", "188596314", "You Were Born To Be Loved", " Taengoo ah")
];

function VideoVimeo(id, h, i, t, m){
  this.Id = id;
  this.HinhNho = h;
  this.IdVideo = i;
  this.TenVideo = t;
  this.MoTa = m;
}

app.get("/form", function(req, res){
  res.render("formThemVids");
});

app.get("/", function(req, res){
  res.render("index_dark", {danhsach:mang});
});

app.post("/upload", function(req, res){

});
