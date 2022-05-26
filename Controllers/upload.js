const { cloudinary } = require("../Utils/cloudinary");

exports.upload = async (req, res, next) => {
  // res.status(200).json({ upload: req.file.filename });
  // console.log(req.file);
  try {
    const fileStr = req.file.path;
    const response = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "sma_uploads",
    });
    console.log(response);
    res.status(200).json({ upload: response.original_filename });
  } catch (error) {
    console.log(error);
    console.log(req.body.data);
    res.status(500).json({ message: "File not uploaded" });
  }
};

exports.getFile = async (req, res, next) => {};
