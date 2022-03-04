const router = require("express").Router()
const authController = require("../Controllers/auth")
const mailController = require("../Controllers/mail")
const auth = require("../Middlewares/auth")
const inputValidation = require("../Middlewares/inputValidation")


router.post('/auth/signup', inputValidation.signupValidation, authController.signup);
router.post('/auth/signin',inputValidation.signinValidation, authController.login);
router.get('/auth/user', auth, authController.user);

router.post('/sendMail', mailController.sendMail);

module.exports = router