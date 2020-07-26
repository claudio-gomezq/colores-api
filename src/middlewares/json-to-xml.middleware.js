const o2x = require('object-to-xml');

module.exports = function (req, res, next) {
    res.sendData = function (obj) {
        const {responseType} = req.query;
        console.log(req.query);

        if (responseType === 'xml') {
            res.header('Content-Type', 'application/xml');

            let objJSON = obj;
            let modelName = null;
            if (typeof obj === 'object' && typeof obj.toJSON === 'function') {
                objJSON = obj.toJSON();
                modelName = obj.constructor.name.toString().toLowerCase();
            }

            const xmlObj = {
                '?xml version=\"1.0\" encoding=\"utf-8\"?': null,
                response: {
                    '#': objJSON
                }
            };

            if (modelName) {
                xmlObj.response = {
                    ...xmlObj.response, '@': {
                        type: modelName
                    }
                }
            }

            const responseXML = o2x(xmlObj);
            return res.send(responseXML);
        }
        res.json(obj);
    };
    next();
}