
var db = require('../db');
var Salon = {
    getSalons: function(callback)
    {
        return db.query('SELECT * FROM salon ', callback);
    }
}

module.exports = Salon;