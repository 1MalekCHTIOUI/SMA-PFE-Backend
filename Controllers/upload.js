exports.upload = async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  res
    .status(200)
    .json({ upload: url + "/public/uploads/" + req.file.filename });
};

exports.getFile = async (req, res, next) => {};
