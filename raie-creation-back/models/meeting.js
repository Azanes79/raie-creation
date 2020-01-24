
var db = require('../db');
var Meeting = {
    getMeetings: function(callback)
    {
        return db.query('SELECT * FROM meeting ', callback);
    },
    createMeeting: function (Meeting, callback) {
        return db.query('INSERT INTO meeting (dateStart, dateEnd, description, salon_id, service_id, user_id) VALUES (?,?,?,?,?,?)',[Meeting.dateStart, Meeting.dateEnd, Meeting.description, Meeting.salon_id, Meeting.service_id, Meeting.user_id], callback);
    },
    updateMeeting: function (Meeting, callback) {
        return db.query('UPDATE meeting SET dateStart = ?, dateEnd = ?, description = ?, salon_id = ?, service_id = ?, user_id = ?',[Meeting.dateStart, Meeting.dateEnd, Meeting.description, Meeting.salon_id, Meeting.service_id, Meeting.user_id], callback)
    },
    deleteMeeting: function (Meeting, callback) {
        return db.query('DELETE FROM meeting WHERE id=' + Meeting.id, callback)
    }
}

module.exports = Meeting;