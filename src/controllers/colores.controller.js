const {Color} = require('../models');
const {mapPaginate, getPagination} = require('../utils/paginate');
const {body, query} = require('express-validator');


const findAllValidations = [
    query('size').isNumeric().optional(),
    query('page').isNumeric().optional()
];

const saveValidations = [
    body('name').exists(),
    body('color').exists().isHexColor(),
    body('pantone').optional(),
    body('year').isNumeric().isLength({min: 4, max: 4}),
];


module.exports.findAll = async (req, res, _) => {
    const {page = 1, size = 6} = req.query;

    const pagination = getPagination(page, size);

    const colors = await Color.findAndCountAll({
        ...pagination,
        order: [['id', 'DESC']]
    });

    const data = mapPaginate(colors, page, size);
    res.sendData(data);
};

module.exports.findById = async (req, res, _) => {
    const {id} = req.params;
    const color = await Color.findByPk(id);

    if (!color) {
        res.status(404).sendData({message: 'El color no existe'})
        return;
    }

    res.sendData(color);
};

module.exports.create = async (req, res, _) => {
    const {name, color, pantone, year} = req.body;
    const createdColor = await Color.create({name, color, pantone, year});
    res.status(201).sendData(createdColor);
};

module.exports.update = async (req, res, _) => {
    const {id} = req.params;
    const {name, color, pantone, year} = req.body;

    const colorDb = await Color.findByPk(id);

    if (!colorDb) {
        res.status(404).sendData({message: 'El color no existe'})
        return;
    }

    await colorDb.update(
        {name, color, pantone, year},
    );
    res.sendData(colorDb);
};

module.exports.delete = async (req, res, _) => {
    const {id} = req.params;

    const result = await Color.destroy({
        where: {id}
    });

    if (result === 0) {
        res.status(404).sendData({message: 'El color no existe'})
        return;
    }

    res.status(204).end();
};

module.exports.findAllValidations = findAllValidations;
module.exports.saveValidations = saveValidations;