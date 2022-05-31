const { cloudinary } = require("../Utils/cloudinary");
const IMAGE_URL_LENGTH = 43;
const START_TO_IMAGE = 84;
exports.upload = async (req, res, next) => {
  // res.status(200).json({ upload: req.file.filename });
  // console.log(req.file);
  try {
    const fileStr = req.file.path;
    const response = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "sma_uploads",
      resource_type: "auto",
    });

    const url = response.secure_url;
    const filename = url.substring(
      START_TO_IMAGE,
      START_TO_IMAGE + IMAGE_URL_LENGTH,
    );

    res.status(200).json({ upload: filename });
  } catch (error) {
    res.status(500).json({ message: "File not uploaded", error: error });
  }
};

exports.getFile = async (req, res, next) => {};
