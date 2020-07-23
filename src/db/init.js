const models = require('../models')

async function init(){
    await models.Colores.sync();
}

module.exports = init;