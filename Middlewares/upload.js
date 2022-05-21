const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const path = require("path");
const Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.name);
  },
});

const uploads = multer({ storage: Storage });
module.exports = uploads;
