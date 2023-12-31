const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrorHandler = require('./asyncErrorHandler');

exports.isAuthenticatedUser = asyncErrorHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ErrorHandler("Please Login to Access", 401));
    }

    const decodedData = jwt.verify(token, "WFFWf15115U842UGUBWF81EE858UYBY51BGBJ5E51Q");
    req.user = await User.findById(decodedData.id);
    next();
});


exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {

        // if (!roles.includes(req.body.role)) {
        //     return next(new ErrorHandler(`Role: ${req.body.role} is not allowed`, 403));
        // }
        next();
    }
}
exports.isAuthenticatedVendor = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed`, 403));
        }
        next();
    }
}