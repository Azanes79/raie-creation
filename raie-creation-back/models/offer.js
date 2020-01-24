
var db = require('../db');
var Offer = {
    getOffers: function(callback)
    {
        return db.query('SELECT * FROM offer ', callback);
    }
}

module.exports = Offer;