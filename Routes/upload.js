const router = require("express").Router();
// const multer = require("multer");
const uploadController = require("../Controllers/upload");
const upload = require("../Middlewares/upload");

router.post("/", upload.single("file"), uploadController.upload);
module.exports = router;
