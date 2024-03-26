//todo
const {body, validationResult} = require("express-validator")
//name, email, username, password
const userSignupValidationRules = () => {
    return [
        body("name").not().isEmpty().isAlpha(),
        body("email").isEmail(),
        body("password").isLength({min:8}).contains()
    ]
}