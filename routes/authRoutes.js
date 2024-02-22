const express = require("express");
const router = express.Router();
const { login, signUp } = require("../controller/authController");
const multer = require("multer");

// Multer setup
const upload = multer({
  limits: {
    fileSize: 1048576,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});
router.post("/login", login);
router.post("/signup", upload.single("avatar"), signUp);

module.exports = router;
