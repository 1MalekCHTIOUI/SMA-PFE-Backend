const router = require("express").Router()
const authController = require("../Controllers/auth")
const mailController = require("../Controllers/mail")
const auth = require("../Middlewares/auth")
const inputValidation = require("../Middlewares/inputValidation")


router.post('/signup', inputValidation.signupValidation, authController.signup);
router.post('/signin',inputValidation.signinValidation, authController.login);
router.get('/user', auth, authController.user);

router.post('/sendMail', mailController.sendMail);

module.exports = router