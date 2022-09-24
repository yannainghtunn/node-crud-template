const { validationResult } = require('express-validator');
const CustomError = require('../custom_error');

function validator(req) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new CustomError("Invalid ( " +errors.array().map((e)=>e.param).join(",")+" )", 400);
    }
}
module.exports = validator;