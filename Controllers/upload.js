const fs = require('fs')
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
function exists (path) {  
    try {
      Fs.access(path)
      return true
    } catch {
      return false
    }
}
exports.uploadFile =(req, res, next) => {
    if(req.files === null) {
        return res.status(400).json({message: 'No file uploaded'})
    }
    const files = Object.keys(req.files)
    const path = `${__dirname}/../../Frontend/public/uploads/files/`

    files.map(item => {
        const file = req.files[item]
        try {
            fs.writeFile(path+file.name, file.data, ()=>{
                res.status(200).json({fileName: file.name, filePath: `/uploads/files/${file.name}`})
            })
        } catch(err){
            console.error(err)
            res.status(500).send(err)
        }
    })

}