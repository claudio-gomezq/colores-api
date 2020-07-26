const models = require('../models')

async function init(){
    await models.Color.sync();
    await models.User.sync();

}

module.exports = init;