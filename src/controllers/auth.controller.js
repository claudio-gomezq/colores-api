const {User} = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {body} = require('express-validator');


const loginValidation = [
    body('email').exists().isEmail().normalizeEmail(),
    body('password').exists(),
];

const registerValidation = [
    body('email').exists().isEmail().normalizeEmail(),
    body('password').exists().isLength({min: 6}),
    body('type').exists().isIn(['admin', 'normal']),
];


module.exports.register = async function (req, res, _) {
    const {name, email, password, type} = req.body;

    const emailExists = await User.findOne({where: {email}});
    if (emailExists) {
        return res.status(400).sendData({message: 'El email ya existe'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create({
            name, email, password: hashedPassword, type
        });

        res.status(201).sendData(user);
    } catch (e) {
        console.error(e);
        res.status(500).sendData({message: 'Error creando el usuario'})
    }

};


module.exports.login = async function (req, res, _) {
    const {email, password} = req.body;

    const user = await User.findOne({where: {email}});

    if (!user) {
        return res.status(404).sendData({message: 'Email no existe'});
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
        return res.status(400).sendData({message: 'Contraseña incorrecta'});
    }

    const token = jwt.sign({sub: user.id}, 'top_secret'); //TODO cambiar en produccion


    res.sendData({
        token: token,
        user: user.toJSON()
    })

};

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;