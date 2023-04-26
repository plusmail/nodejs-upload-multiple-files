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

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  }),
});

// const upload = multer({ dest: 'uploads/' });
router.post("/multiple-upload", upload.array('files'),  async (req, res) => {
  const { title, content } = req.body;
  console.log("=======", title, content);
  console.log("=======2", req.files);

  // 파일 처리
  const uploadedFiles = req.files;
  const uploadDir = path.join(__dirname,'../','uploads');
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const files = [];
  for (const file of uploadedFiles) {
    const oldPath = file.path;
    const newFilename = new Date().getTime() +'_'+ file.filename;
    const newPath = path.join(uploadDir, newFilename);
    console.log("333333333->", newPath);
    fs.renameSync(oldPath, newPath);
    files.push({ filename: file.filename, url: `/img/${newFilename}` });
  }
  console.log("=======3", files);
  // 글 등록
  const upload = await uploadfiles.create({
    title,
    content,
    files,
  })

  const newPost = {
    id: Date.now(),
  };

  // 데이터베이스에 글 정보 저장

  res.json(newPost);
});



module.exports = router;