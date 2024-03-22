const { pool } = require('../config/database');
const poolQuery = require('util').promisify(pool.query).bind(pool);

const getVotes = async (id) => {
	try {
		let query = `SELECT * FROM initiatives WHERE id = ${id}`;

		let result = await poolQuery(query, id);

		return result[0];
	} catch (error) {
		throw error;
	}
};

const getVoteByID = async (id) => {
	try {
		let result = await poolQuery(`SELECT * FROM votes WHERE id = ? `, [id]);

		return result[0];
	} catch (error) {
		throw error;
	}
};

const setVote = async (userId, initiativeId) => { 
    try {
		let result = await poolQuery(`INSERT INTO votes (initiativeID, userID) VALUES (?, ?)`, [initiativeId, userId]);

		return result.insertId;
    } catch (error) { 
		throw error;
    }

}


module.exports = {
	getVoteByID,
	setVote,
};
