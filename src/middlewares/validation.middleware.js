const {validationResult} = require('express-validator');

module.exports.sendErrorIfValidationFails = function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).sendData({errors: errors.array()});
    }
    next();
}