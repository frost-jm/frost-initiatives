const { pool } = require('../config/database');
const poolQuery = require('util').promisify(pool.query).bind(pool);

const getAllInitiatives = async ({ status = 1 }) => {
	try {
		let query = `SELECT * FROM initiatives WHERE status = ${status}`;

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

		return result[0];
	} catch (error) {
		throw error;
	}
};

const createInitiative = async (data) => {
	try {
		let { department, ...initiativeData } = data;

		const result = await poolQuery('INSERT INTO initiatives SET ?', [initiativeData]);

		return result.insertId;
	} catch (error) {
		throw error;
	}
};

const updateInitiative = async (id, data) => {
	try {
		const result = await poolQuery('UPDATE initiatives SET ? WHERE id = ?', [data, id]);
	} catch (error) {
		throw error;
	}
};

const deleteInitiative = async (id) => {
	try {
		await poolQuery(`UPDATE initiatives SET deleted = 1 WHERE id = ?`, [id]);
	} catch (error) {
		throw error;
	}
};

const joinInitiative = async (initiativeId, userId) => {
	console.log('init', initiativeId);
	console.log('user', userId);
	try {
		const [initiative] = await poolQuery('SELECT members FROM initiatives WHERE id = ?', [initiativeId]);
		if (!initiative) {
			throw new Error('Initiative not found');
		}

		const currentMembers = initiative.members || '';
		const members = new Set(currentMembers.split(',').map((id) => id.trim()));
		if (!members.has(userId)) {
			members.add(userId);

			await poolQuery('UPDATE initiatives SET members = ? WHERE id = ?'[(Array.from(members).join(','), initiativeId)]);
		}

		const updatedInitiative = await poolQuery('SELECT * FROM initiatives WHERE id = ?', [initiativeId]);
		if (!updatedInitiative) {
			throw new Error('Updated initiative not found');
		}

		return true;
	} catch (error) {
		throw error;
	}
};

const leaveInitiative = async (initiativeId, userId) => {
	try {
		const [initiative] = await poolQuery('SELECT members FROM initiatives WHERE id = ?', [initiativeId]);
		if (!initiative) {
			throw new Error('Initiative not found');
		}

		const currentMembers = initiative.members || '';

		const members = new Set(currentMembers.split(',').map((id) => id.trim()));
		if (members.has(userId)) {
			members.delete(userId);

			await poolQuery('UPDATE initiatives SET members = ? WHERE id = ?', [Array.from(members).join(','), initiativeId]);
		}

		return true;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getAllInitiatives,
	getInitiativeById,
	createInitiative,
	updateInitiative,
	deleteInitiative,
	joinInitiative,
	leaveInitiative,
};
