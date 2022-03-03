const { body, check } = require("express-validator");

exports.signupValidation = 
    [
        check('email').not().isEmpty().withMessage("Email field is empty!"),
        // check('password').not().isEmpty().withMessage("Password field is empty!"),
        check('first_name').not().isEmpty().withMessage("Firstname field is empty!"),
        check('last_name').not().isEmpty().withMessage("Lastname field is empty!"),
        body('email').trim().isEmail().withMessage('Email is not valid').normalizeEmail().toLowerCase(),
        // body('password').trim().isLength({min: 6}).withMessage('Minimum 6 characters required for password')
    ]

exports.signinValidation = 
    [
        check('email').not().isEmpty().withMessage("Email field is empty!"),
        check('password').not().isEmpty().withMessage("Password field is empty!"),
        body('email').trim().isEmail().withMessage('Email is not valid').normalizeEmail().toLowerCase(),
        body('password').trim().isLength({min: 6}).withMessage('Min 6 char required for password')
    ]


