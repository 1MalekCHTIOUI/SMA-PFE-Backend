
exports.uploadPicture =(req, res, next) => {
    if(req.files === null) {
        return res.status(400).json({message: 'No file uploaded'})
    }
    console.log(req.body);
    
    const file = req.files.file
    file.mv(`${__dirname}/../../Frontend/public/uploads/profilePictures/${file.name}`, err => {
        if(err) {
            console.error(err)
            return res.status(500).send(err)
        }
        res.json({fileName: file.name, filePath: `/uploads/profilePictures/${file.name}`})
    })
}

exports.uploadFile =(req, res, next) => {
    if(req.files === null) {
        return res.status(400).json({message: 'No file uploaded'})
    }
    console.log(req.files);
    
    const file = req.files.file
    file.mv(`${__dirname}/../../Frontend/public/uploads/files/${file.name}`, err => {
        if(err) {
            console.error(err)
            return res.status(500).send(err)
        }
        res.json({fileName: file.name, filePath: `/uploads/files/profilePictures/${file.name}`})
    })
}