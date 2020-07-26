module.exports.isUserAdmin = function (req, res, next) {
    if (req.user.type === 'admin') {
        return next();
    }
    res.status(403).sendData({message: 'El usuario no tiene acceso a esta ruta'});
}