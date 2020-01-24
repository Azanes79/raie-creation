
var db = require('../db');
var Service = {
    getServices: function(callback)
    {
        return db.query('SELECT * FROM service ', callback);
    }
}

module.exports = Service;