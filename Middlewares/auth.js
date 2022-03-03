const jwt = require('jsonwebtoken');
const User = require('../Models/User');

module.exports = async (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        }catch(e) {
            console.log(e);
            return res.status(401).json({ message: "Not Authorized" });
        }
        if(!token)
            return res.status(401).json({message: "No Authorization, No Token"})

    }
};