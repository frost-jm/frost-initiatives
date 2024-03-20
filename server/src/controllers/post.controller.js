const { pool } = require('../config/database');
const poolQuery = require('util').promisify(pool.query).bind(pool);

const getAllInitiatives = async ({ status = 1 }) => {
	try {
		let parameters = {
			status: status
		}

		let query = `SELECT * FROM initiatives WHERE status = ${status}`

		let results = await poolQuery(query, status);

		console.log(results);

		return {
			
		};
	} catch (error) {
		throw error;
	}
};

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
	createInitiative,
};
