const router = require("express").Router()
const uploadController = require("../Controllers/upload")

router.post('/', uploadController.uploadPicture)
router.post('/file', uploadController.uploadFile)

module.exports = router