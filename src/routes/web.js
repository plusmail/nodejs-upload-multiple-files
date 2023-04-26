const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const uploadController = require("../controllers/upload");
const path = require("path");
const multer = require("multer");
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });
let routes = app => {
  router.get("/", homeController.getHome);

  // router.post("/multiple-upload",  uploadController.multipleUpload);
  router.post("/multiple-upload", upload.array('files'),  (req, res) => {
    const { title, content } = req.body;
    console.log("=======", title, content);
  
    // 파일 처리
    const uploadedFiles = req.files;
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
  
    const files = [];
    for (const file of uploadedFiles) {
      const oldPath = file.path;
      const newPath = path.join(uploadDir, file.filename);
      fs.renameSync(oldPath, newPath);
      files.push({ filename: file.filename, url: `/uploads/${file.filename}` });
    }
  
    // 글 등록
    const newPost = {
      id: Date.now(),
      title,
      content,
      files,
    };
  
    // 데이터베이스에 글 정보 저장
  
    res.json(newPost);
  });

  return app.use("/", router);
};

module.exports = routes;