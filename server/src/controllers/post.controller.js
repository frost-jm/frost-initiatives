const { pool } = require('../config/database');
const poolQuery = require('util').promisify(pool.query).bind(pool);

const getAllInitiatives = async ({ status = 1 }) => {
	try {
		let query = `SELECT * FROM initiatives WHERE status = ${status}`

		let results = await poolQuery(query, status);

		return results;
	} catch (error) {
		throw error;
	}
};

const getInitiativeById = async (id) => {
	try {
		let query = `SELECT * FROM initiatives WHERE id = ${id}`;

		let result = await poolQuery(query, id);

		return result[0]
	} catch (error) {
		throw error;
	}
}

const createInitiative = async (data) => {
	try {
		let { department, ...initiativeData} = data;

		const result = await poolQuery('INSERT INTO initiatives SET ?', [initiativeData]);

		return initiativeData.id 
	} catch (error) {
		throw error;
	}
}

const updateInitiative = async (id, data) => {
	try {

 		await poolQuery('UPDATE initiatives SET ? WHERE id = ?', [data, id]);
		
	}  catch (error) {
		throw error;
	}
}

module.exports = {
	getAllInitiatives,
	getInitiativeById,
	createInitiative,
	updateInitiative,
};
