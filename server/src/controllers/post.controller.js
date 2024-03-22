const { pool } = require('../config/database');
const poolQuery = require('util').promisify(pool.query).bind(pool);

const getAllInitiatives = async ({ status = 1 }) => {
	try {
		let query = `
				SELECT 
    			p.*,
				GROUP_CONCAT(DISTINCT d.department ORDER BY d.department SEPARATOR ', ') AS department
				FROM 
					initiatives p
				LEFT JOIN 
					initiative_departments id 
				ON 
					p.id = id.initiative_id 
				LEFT JOIN 
					departments d 
				ON 
					id.department_id = d.id
				WHERE 
					p.status = 1
				AND
					p.deleted = false
				GROUP BY 
					p.id;`;

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
		const postId = result.insertId;

		if (department && department.length > 0) {
			const dept = department.map((deptId) => [postId, deptId]);
			await poolQuery('INSERT INTO initiative_departments (initiative_id, department_id) VALUES ?', [dept]);
		}

		return postId;
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
