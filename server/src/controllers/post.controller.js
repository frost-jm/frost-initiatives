const { pool } = require('../config/database');
const poolQuery = require('util').promisify(pool.query).bind(pool);
const { getVotes } = require('../controllers/votes.controller');

const getAllInitiatives = async ({ status = 1 }) => {
	try {
		let results = await poolQuery( `SELECT * FROM initiatives WHERE status = ?`, status);
		let initiativesData = [];

		if(results.length > 0) {
			initiativesData = await Promise.all(results.map(async (result) => {
				let voteData = await getVotes(result.id);
				return {
					...result,
					votes: voteData
				};
			}));
		}

		return initiativesData;
	} catch (error) {
		throw error;
	}
};

const getInitiativeById = async (id) => {
	try {
		let result = await poolQuery(`SELECT * FROM initiatives WHERE id = ?`, id);

		if(result.length == 0) {
			throw new Error('Initiative not found!');
		}

		let voteData = await getVotes(result[0].id);

		return {
			...result[0],
            votes: voteData
		};
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
	try {
		const [initiative] = await poolQuery('SELECT members FROM initiatives WHERE id = ?', [initiativeId]);
		if (!initiative) {
			throw new Error('Initiative not found');
		}

		let currentMembers = initiative.members || '';

		currentMembers = currentMembers.trim().replace(/^,*/, '');

		const members = new Set(currentMembers.split(',').map((id) => id.trim()));
		if (!members.has(userId)) {
			members.add(userId);

			await poolQuery(`UPDATE initiatives SET members = ? WHERE id = ?`, [Array.from(members).join(','), initiativeId]);
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

		let currentMembers = initiative.members || '';

		currentMembers = currentMembers.trim();

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
