
var db = require('../db');
var User = {
    getUsers: function(callback)
    {
        return db.query('SELECT * FROM user ', callback);
    }
}

module.exports = User;