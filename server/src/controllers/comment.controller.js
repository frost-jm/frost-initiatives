const { pool } = require('../config/database');
const poolQuery = require('util').promisify(pool.query).bind(pool);

const getAllComments = async (postId) => {
	try {
		const comments = await poolQuery('SELECT * FROM initiative_comments WHERE initiativeID = ?', [postId]);
		return comments;
	} catch (error) {
		throw error;
	}
};

const getCommentByID = async (commentID) => {
	console.log('here', commentID);
	try {
		const comment = await poolQuery('SELECT * FROM initiative_comments WHERE id = ?', [commentID]);
		return comment;
	} catch (error) {
		throw error;
	}
};

const insertComment = async (commentData) => {
	try {
		const result = await poolQuery('INSERT INTO initiative_comments SET ?', [commentData]);
		return result.insertId;
	} catch (error) {
		throw error;
	}
};

const updateComment = async (commentID, newComment) => {
	try {
		const { ...commentFields } = newComment;
		await poolQuery('UPDATE initiative_comments SET ? WHERE id = ?', [commentFields, commentID]);
		return commentID;
	} catch (error) {
		throw error;
	}
};

const deleteComment = async (commentID) => {
	try {
		await poolQuery('DELETE FROM initiative_comments WHERE id = ?', [commentID]);
		return true;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getAllComments,
	getCommentByID,
	insertComment,
	updateComment,
	deleteComment,
};
