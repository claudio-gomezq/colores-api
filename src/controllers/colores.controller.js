const {Colores} = require('../models');
const {mapPaginate, getPagination} = require('../utils/paginate');

module.exports.findAll = async (req, res, next) => {
    const {page = 1, size = 6} = req.query;

    const pagination = getPagination(page, size);

    const colores  = await Colores.findAndCountAll(pagination);

    const data = mapPaginate(colores, page, size);
    res.json(data);
};

module.exports.findById = async (req, res, next) => {
    const {id} = req.params;
    const color = await Colores.findByPk(id);

    if(!color){
        res.status(404).json({message: 'El color no existe'})
        return;
    }

    res.json(color);
};

module.exports.create = async (req, res, next) => {
    const {name, color, pantone, year} = req.body;
    const createdColor = await Colores.create({name, color, pantone, year});
    res.status(201).json(createdColor);
};

module.exports.update = async (req, res, next) => {
    const {id} = req.params;
    const {name, color, pantone, year} = req.body;

    const colorDb = await Colores.findByPk(id);

    if(!colorDb){
        res.status(404).json({message: 'El color no existe'})
        return;
    }

    await colorDb.update(
        {name, color, pantone, year},
    );
    res.json(colorDb);
};

module.exports.delete = async (req, res, next) => {
    const {id} = req.params;

    const result = await Colores.destroy({
        where: {id}
    });

    if(result === 0){
        res.status(404).json({message: 'El color no existe'})
        return;
    }

    res.status(204).end();
};