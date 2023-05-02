const util = require("util");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../../upload`));
  },
  filename: (req, file, callback) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      var message = `<strong>${file.originalname}</strong> is invalid. Only accept png/jpeg.`;
      return callback(message, null);
    }

    let filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  }
});

let uploadFiles = multer({ storage: storage }).fields("multi-files", 10);
exports.uploadFilesMiddleware = util.promisify(uploadFiles);




exports.upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, done) {
      console.log("file---->", file);
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
