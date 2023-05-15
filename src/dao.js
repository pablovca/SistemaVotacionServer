const sqlite3 = require('sqlite3').verbose();
const filepath = './Votes.db';

DAO = { 
    db: createDBConnection()
}

function createDBConnection() {
    const db = new sqlite3.Database(filepath, (error) =>  {
        if (error) {
            return console.error(error.message);
        }
    });
    console.log("Conectado a la base de datos");
    return db;
}

function getStudent(student_id, section, callback) {
    return DAO.db.get(`SELECT id, already_voted, section 
                   FROM students 
                   WHERE id = ? AND section = ?`,
                   [student_id, section],
                   callback);
}

function getStudents(callback) {
    return DAO.db.all(`SELECT id, already_voted, section
                       FROM students`, callback);
}

function getSection(section_id, callback) {
    return DAO.db.get(`SELECT id, quantity 
                       FROM sections
                       WHERE id = ?`,
                       [section_id],
                       callback);
}

function getSections(callback) {
    return DAO.db.all(`SELECT id, quantity
                       FROM sections`, callback);
}

function getParties(callback) {
    return DAO.db.all(`SELECT id, votes, president_name, party_name
                       FROM parties`, callback);
}

function postVote(vote, callback) {
    DAO.db.run('INSERT INTO votes (student_id, section, party_id) VALUES (?, ?, ?)', 
                [vote.student_id, vote.section, vote.party_id],
                callback);
}

module.exports = {
    getStudent: getStudent,
    getStudents: getStudents,
    getSection: getSection,
    getSections: getSections,
    getParties: getParties,
    postVote: postVote
};