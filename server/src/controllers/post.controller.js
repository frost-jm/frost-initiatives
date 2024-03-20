const { pool } = require('../config/database');
const poolQuery = require('util').promisify(pool.query).bind(pool);

const getAllInitiatives = async ({ status = 1 }) => {
	try {
		let query = `SELECT * FROM initiatives WHERE status = ${status}`

		let results = await poolQuery(query, status);

		return {
			initiatives: results
		};
	} catch (error) {
		throw error;
	}
};

const getInitiativeById = async (id) => {
	try {
		let query = `SELECT * FROM initiatives WHERE id = ${id}`;

		let result = await poolQuery(query, id);

		return result
	} catch (error) {
		throw error;
	}
}

const createInitiative = async (data) => {
	try {
		let { department, ...initiativeData} = data;

		const result = await poolQuery('INSERT INTO initiatives SET ?', [initiativeData]);

	} catch (error) {
		throw error;
	}
}

module.exports = {
	getAllInitiatives,
	getInitiativeById,
	createInitiative,
};
