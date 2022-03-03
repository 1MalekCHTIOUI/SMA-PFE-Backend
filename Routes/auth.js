const router = require("express").Router()
const { body } = require("express-validator");
const authController = require("../Controllers/auth")
const auth = require("../Middlewares/auth")
const inputValidation = require("../Middlewares/inputValidation")


router.post('/signup', inputValidation.signupValidation, authController.signup);
router.post('/signin',inputValidation.signinValidation, authController.login);
router.get('/user', auth, authController.user);

module.exports = router