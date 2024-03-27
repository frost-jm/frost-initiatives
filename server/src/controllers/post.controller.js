const { pool } = require('../config/database');
const poolQuery = require('util').promisify(pool.query).bind(pool);
const { getVotes } = require('../controllers/votes.controller');

const getAllInitiatives = async (
	status = 1,
	pagination = {
		page: 1,
		limit: 5,
	},
	filterParams = {
		department: null,
		byDate: 'latest',
		byVoteCount: null,
	}
) => {
	try {
		let { department, byDate, byVoteCount } = filterParams;
		let { page, limit } = pagination;
		let offset = (page - 1) * limit;
		let query = `
				SELECT 
					p.*,
				GROUP_CONCAT(DISTINCT d.department ORDER BY d.department SEPARATOR ', ') AS department,
				COUNT(v.initiativeID) AS VoteCount
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
				LEFT JOIN
					votes v
				ON
					p.id = v.initiativeID
				WHERE 
					p.status = ?
				AND
					p.deleted = false
				${department != null ? 'AND id.department_id = ?' : ''}
				GROUP BY 
					p.id
				ORDER BY
					p.created_date ${byDate ? (byDate.toLowerCase() == 'oldest' ? 'ASC' : 'DESC') : 'DESC'}
					${byVoteCount ? (byVoteCount.toLowerCase() == 'most' ? ', VoteCount DESC' : ', VoteCount ASC') : ''}
				LIMIT ?, ?;`;

		let countQuery = `
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
					p.status = ?
				AND
					p.deleted = false
				${department != null ? 'AND id.department_id = ?' : ''}
				GROUP BY 
					p.id;`;

		let results;
		let count;
		let initiativesData = [];

		if (department) {
			results = await poolQuery(query, [status.status, department, offset, limit]);
			count = await poolQuery(countQuery, [status.status, department]);
		} else {
			results = await poolQuery(query, [status.status, offset, limit]);
			count = await poolQuery(countQuery, [status.status]);
		}

		if (results.length > 0) {
			initiativesData = await Promise.all(
				results.map(async (result) => {
					let voteData = await getVotes(result.id);
					return {
						...result,
						votes: voteData,
					};
				})
			);
		}

		return {
			items: initiativesData,
			paginationData: {
				page: page,
				total: count.length,
			},
		};
	} catch (error) {
		throw error;
	}
};

const getInitiativeById = async (id) => {
	try {
		let result = await poolQuery(`SELECT * FROM initiatives WHERE id = ?`, id);

		if (result.length == 0) {
			throw new Error('Initiative not found!');
		}

		let voteData = await getVotes(result[0].id);

		return {
			...result[0],
			votes: voteData,
		};
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
		let { department, ...initiativeData } = data;

		await poolQuery('UPDATE initiatives SET ? WHERE id = ?', [initiativeData, id]);

		if (department && department.length > 0) {
			await poolQuery('DELETE FROM initiative_departments WHERE initiative_id = ?', [id]);

			const dept = department.map((deptId) => [id, deptId]);
			await poolQuery('INSERT INTO initiative_departments (initiative_id, department_id) VALUES ?', [dept]);
		}

		return id;
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

		currentMembers = currentMembers.trim().replace(/^,|,$/g, '');

		const membersArray = currentMembers.split(',').filter((member) => member.trim() !== '');

		const members = new Set(membersArray.map((id) => id.trim()));

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

		currentMembers = currentMembers.trim().replace(/^,|,$/g, '');

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
