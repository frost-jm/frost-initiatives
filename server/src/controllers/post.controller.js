const { pool } = require('../config/database');
const poolQuery = require('util').promisify(pool.query).bind(pool);

const getAllPosts = async ({ orderBy = 'desc', tags = [], createdBy = null, title = null, page = 1, pageSize = 9 }) => {
	try {
		return {
			posts: formattedResults,
			count: postCount,
			currentPage: page,
		};
	} catch (error) {
		throw error;
	}
};

const getPostById = async (postId) => {
	try {
		const query = `
			SELECT
				p.*,
				tags.tag_list
			FROM
				posts p
				LEFT JOIN (
					SELECT post_id, GROUP_CONCAT(tag) AS tag_list
					FROM posts_tags
					JOIN tags ON posts_tags.tag_id = tags.id
					GROUP BY post_id
				) tags ON p.id = tags.post_id
			WHERE
				p.id = ${postId}
			GROUP BY
				p.id
		`;

		const params = [postId];
		const result = await poolQuery(query, params);

		if (result.length === 0) {
			// Post not found
			return null;
		}

		const row = result[0];

		const tagsArray = row.tag_list ? row.tag_list.split(',') : [];

		const mediaFilesArray = row.media_files
			? JSON.parse(row.media_files).map((mediaFile) => ({
					media_url: mediaFile.media_url || null,
					media_type: mediaFile.media_type || null,
					post_id: mediaFile.post_id || null,
			  }))
			: [];

		const formattedResult = {
			...row,
			tags: tagsArray,
			created_date: formatDate(row.created_date),
			media_files: mediaFilesArray,
		};

		return formattedResult;
	} catch (error) {
		throw error;
	}
};

const createPost = async (postData) => {
	try {
		const { tagsId, ...postFields } = postData;

		const result = await poolQuery('INSERT INTO posts SET ?', [postFields]);
		const postId = result.insertId;

		if (tagsId && tagsId.length > 0) {
			const tagAssociations = tagsId.map((tagId) => [postId, tagId]);
			await poolQuery('INSERT INTO posts_tags (post_id, tag_id) VALUES ?', [tagAssociations]);
		}

		return postId;
	} catch (error) {
		throw error;
	}
};

const updatePost = async (postId, updatedData) => {
	try {
		const { tagsId, ...postFields } = updatedData;

		await poolQuery('UPDATE posts SET ? WHERE id = ?', [postFields, postId]);

		await poolQuery('DELETE FROM posts_tags WHERE post_id = ?', [postId]);

		if (tagsId && tagsId.length > 0) {
			const tagAssociations = tagsId.map((tagId) => [postId, tagId]);
			await poolQuery('INSERT INTO posts_tags (post_id, tag_id) VALUES ?', [tagAssociations]);
		}

		return postId;
	} catch (error) {
		throw error;
	}
};

const deletePost = async (postId) => {
	try {
		await poolQuery('UPDATE posts SET deleted = true WHERE id = ?', [postId]);
	} catch (error) {
		throw error;
	}
};

const formatDate = (dateString) => {
	const options = { month: 'short', day: 'numeric', year: 'numeric' };
	return new Date(dateString).toLocaleDateString('en-US', options);
};

module.exports = {
	getAllPosts,
	getPostById,
	createPost,
	updatePost,
	deletePost,
};
