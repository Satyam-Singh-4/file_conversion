const router = require("express").Router();
const multer = require("multer");
const conversion = require("../Controller/conversion");
const maxSize = 1000000;
//multer storage

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//multer upload

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/tiff") {
      cb(null, true);
    } else {
      cb(null, false);
      return new Error("only png or tiff file allowed");
    }
  },
  limits: { fileSize: maxSize },
});

router.post("/convert", upload.single("path"), conversion.convertFile);
router.post("/pngToBlob", upload.single("path"), conversion.pngToBlob);

module.exports = router;
