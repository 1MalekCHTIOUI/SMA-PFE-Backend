const router = require("express").Router()
const userController = require("../Controllers/users")

const inputValidation = require("../Middlewares/inputValidation")


router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUser);
router.put('/users/:id', userController.editUser);


module.exports = router