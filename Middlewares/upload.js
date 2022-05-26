const { v4 } = require("uuid");
const DIR = "./public/uploads";
const multer = require("multer");
const path = require("path");
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, DIR);
//   },
//   filename: (req, file, cb) => {
//     const fileName = file.originalname.toLowerCase().split(" ").join("-");
//     cb(null, v4() + "-" + fileName);
//   },
// });
// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//     if (
//       file.mimetype == "image/png" ||
//       file.mimetype == "image/jpg" ||
//       file.mimetype == "image/jpeg" ||
//       file.mimetype == "application/pdf" ||
//       file.mimetype ==
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     ) {
//       cb(null, true);
//     } else {
//       cb(null, false);
//       return cb(
//         new Error("Only .png, .jpg, .jpeg, .pdf and .docx format allowed!"),
//       );
//     }
//   },
// });
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
