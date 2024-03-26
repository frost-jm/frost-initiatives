const { pool } = require('../config/database');
const poolQuery = require('util').promisify(pool.query).bind(pool);
const { getUsersByDepartment } = require('../controllers/department.controller');

const getVotes = async (initiativeId) => {
	try {
		let votes = await poolQuery('SELECT * FROM votes WHERE initiativeID = ?', [initiativeId]);
		let selectedDepartments = await poolQuery('SELECT * FROM initiative_departments WHERE initiative_id = ?', [initiativeId]);
		let usersVoted = [];
		let notVoted = [];
		let validUsers = [];
		let hailstormData = await getUsersByDepartment();

		if(hailstormData.length == 0) {
			throw new Error('Could not retrieve data from Hailstorm!');
		}

		selectedDepartments.map((department) => {
			hailstormData.map((user) => {
				let validUser = user.departments.find((item) => item.id === department.department_id);

				if(validUser && !validUsers.includes(user)) {
					validUsers.push(user);	
				}
			})
		})

		if(votes.length > 0 ) {
			votes.map((vote) => {
				if(!usersVoted.includes(vote.userID)) {
					usersVoted.push(vote.userID);
				}
			})

			validUsers.filter(user => !usersVoted.includes(user.userId)).map((validUser) => {
				notVoted.push(validUser.userId);
			})
		}

		let voteObject = {
			voted: usersVoted,
			notVoted: notVoted,
			maxVotes: validUsers.length,
		}
	
		return voteObject;
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
	getVotes,
	getVoteByID,
	setVote,
};
