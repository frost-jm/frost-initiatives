const { pool } = require('../config/database');
const poolQuery = require('util').promisify(pool.query).bind(pool);
const axios = require('axios');

const departmentsData = {
	Content: {
		id: 1,
		positions: ['Content Writer', 'Content Writer II', 'Mid-Level Content Writer', 'Content Director'],
	},
	Design: {
		id: 2,
		positions:  ['Chief Creative', 'Visual Designer I', 'Visual Designer II', 'Design Operations I', 'Mid-Level Visual Designer', 'Sr. Visual Designer'],
	},
	Dev: {
		id: 3,
		positions: ['Technical Lead', 'Front End Developer', 'Front End Developer II', 'Mid-Level Front End Developer', 'Chief Creative']
	},
	Execom: {
		id: 4,
		positions: ['Independent Director', 'Chief Executive', 'Chief Creative'],
	},
	Mancomm: {
		id: 5, 
		positions: ['Independent Director', 'Chief Executive', 'Chief Creative', 'Content Director', 'Technical Lead', 'Talent Acquisition and Development Partner'],
	},
	OrgWide: {
		id: 6,
		positions: [
			'Independent Director',
			'Chief Executive',
			'Chief Creative',
			'Content Director',
			'Technical Lead',
			'Talent Acquisition and Development Partner',
			'Content Writer',
			'Content Writer II',
			'Mid-Level Content Writer',
			'Front End Developer',
			'Front End Developer II',
			'Mid-Level Front End Developer',
			'Visual Designer I',
			'Visual Designer II',
			'Design Operations I',
			'Mid-Level Visual Designer',
			'Sr. Visual Designer',
			'Project Coordinator',
			'Mid-level Project Manager',
			'Talent Acquisition Specialist',
			'Admin',
		]
	},
	PMO: {
		id: 7,
		positions: ['Project Coordinator', 'Mid-level Project Manager']
	},
	TMG: {
		id: 8,
		positions: ['Talent Acquisition and Development Partner', 'Talent Acquisition Specialist', 'Admin'],
	},
	
};

const assignDepartments = (users, departmentCriteria) => {
	return users.map((user) => {
		const departments = [];
		// for (const [department, positions] of Object.entries(departmentCriteria)) {
		// 	if (positions.some((position) => user.position.toLowerCase().includes(position.toLowerCase()))) {
		// 		departments.push(department);
		// 	}
		// }

		for (const [department, data] of Object.entries(departmentCriteria)) {
			//console.log(data.positions)
			if (data.positions.some((position) => user.position.toLowerCase().includes(position.toLowerCase()))) {
				departments.push({
					id: data.id,
					name: department,
				});
			}
		
		}

		return { ...user, departments };
	});
};

const getUsersByDepartment = async () => {
	try {
		let res = await axios.get(process.env.HAILSTORM_API);

		let result = assignDepartments(res.data.users, departmentsData);

		return result;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getUsersByDepartment,
};

