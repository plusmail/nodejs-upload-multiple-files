const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const path = require("path");
const multer = require("multer");
const fs = require('fs');
const {uploadfiles} = require('../models')


router.get("/",  async (req, res) => {

  return res.render('index');
});

router.get("/list",  async (req, res) => {

  const upload = await uploadfiles.findAll({

  })
  // let img =upload[0].files[0].url;
  // console.log(img);
  // for(let i =0; i < upload.length; i++){
  //   // for(const files in upload[i]) {
  //     console.log(upload[i].files);
  //     for( let j=0 ; j< upload[i].files.length;j++){
  //       console.log(upload[i].files[j].url);
  //     }
  //   // }
  // }
  // console.log("1111111->", upload[0].files[0].url);

  return res.render('list',{upload});
});

// const upload = multer({ dest: 'uploads/' });

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const fileName = `${path.basename(
          file.originalname,
          ext
      )}_${Date.now()}${ext}`;
      done(null, fileName);
    }
  }),
  fileFilter : (req, file, cb) => {
    const typeArray = file.mimetype.split('/');
    const fileType = typeArray[1];

    if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg' || fileType == 'gif' || fileType == 'webp') {
      req.fileValidationError = null;
      cb(null, true);
    } else {
      req.fileValidationError = "jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.";
      cb(null, false)
    }
  },
  limits : { fileSize: 5 * 1024 * 1024 },
});


router.post("/multiple-upload", upload.array('files'),  async (req, res) => {
  const { title, content } = req.body;
  console.log("=======2", req.files);

  try{
    const files = [];
    for (const file of req.files) {
      files.push({ filename: file.filename, url: `/img/${file.filename}` });
    }
    const upload = await uploadfiles.create({
      title,
      content,
      files,
    })
    if(upload === null){
      console.log("게시물 등록 에러!");
      res.status(400).json({"msg":"uploadError"});
    }else{
      console.log("게시물 등록!");
      res.status(200).json({"msg":"uploadSuccess"});
    }
  }catch (error){
    console.error(error);
    res.status(500).json({"msg":error});
  }
});



module.exports = router;