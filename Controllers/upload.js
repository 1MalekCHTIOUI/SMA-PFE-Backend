exports.upload = async (req, res, next) => {
  res.status(200).json({ upload: req.file.filename });
};

exports.getFile = async (req, res, next) => {};
