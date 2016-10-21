var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("./views");
app.listen(3000);

app.get("/form", function(req, res){
  res.render("form");
});

//Config Multer
var multer = require("multer");
var mime = ["image/jpeg", "image/png"];

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "./public/upload");
  },
  filename: function(req, file, cb){
    console.log("xxxxxxxxxxxxxxx");
    cb(null, Date.now() + "-" + file.originalname);
  }
});

var upload = multer({
  storage   : storage,
  limits    : {fileSize: 1024*1024*10},
  fileFilter: function(req, file, cb){

    if(mime.indexOf(file.mimetype)==-1){
        return cb(new Error("Sai loai File!"));
    }else{
        return cb(null, true);
    }

  }
}).single("fileAvatar");

// name="fileAvatar"
app.post("/upload", function(req, res){
  upload(req, res, function(err){
    if(err){
      console.log(err);
      res.end();
      return;
    }else{
      console.log("Upload Ok!");
      res.send("Upload thanh cong, filename: " + req.file.filename);
    }
  });

});
