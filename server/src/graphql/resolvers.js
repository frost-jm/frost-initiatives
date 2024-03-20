const { getAllTags, getTagById, createTag, updateTag, deleteTag } = require('../controllers/tags.controller');
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/post.controller');
const { getAllComments, getCommentByID, updateComment, deleteComment, insertComment } = require('../controllers/comment.controller');

const { pool } = require('../config/database');
const poolQuery = require('util').promisify(pool.query).bind(pool);

const { OpenAI } = require('openai');
const axios = require('axios');

const openai = new OpenAI({
	apiKey: process.env.OPENAI_KEY,
});

const getAnalyzedData = async (text) => {
	let summary = '';
	let startTime = Date.now();
	let gpt_response = {
		summary: '',
	};

	const parsed = JSON.parse(text);
	const content = parsed.map((obj) => obj.data.text).join(' ');

	let role_instructions = `
		As a Technical Design Analyst you highlight key points and summarize data provided to you. 
		Anything unrelated to tech and design work you return 'invalid' only without explanations.
	`;
	let prompt = `
		Tone: 50% spartan. No introductions. Check this data: ${content} and summarize and
		explain in two paragraphs with max of 2 sentences each. Return the output in raw HTML format.
	`;

	try {
		let completion = await openai.chat.completions.create({
			model: 'gpt-4',
			messages: [
				{
					role: 'system',
					content: role_instructions,
				},
				{
					role: 'user',
					content: prompt,
				},
			],
			temperature: 0,
			max_tokens: 1000,
		});

		summary = completion.choices[0].message.content;

		role_instructions = `
			You are a technical design analyst and you assign tags based on the content you receive.
			You also only assign a maximum of 3 tags.
		`;

		gpt_response.summary = summary;

		const endTime = Date.now();
		const responseTimeInSeconds = (endTime - startTime) / 1000;

		console.log(`OpenAI response time: ${responseTimeInSeconds} seconds`);
	} catch (error) {
		throw error;
	}

	return gpt_response;
};

const resolvers = {
	Mutation: {
		createdInitiative: async (_, { input }) => {},
		addComment: async (_, { input }) => {
			try {
				console.log('comment', input);
				const commentId = await insertComment(input);

				const insertedComment = await getCommentByID(commentId);

				return { data: insertedComment, success: true, message: 'Comment added successfully', error: null };
			} catch (error) {
				return {
					data: null,
					success: false,
					message: 'Failed to add comment',
					error: {
						message: error.message,
						code: 'COMMENT_INSERTION_ERROR',
					},
				};
			}
		},
		editComment: async (_, { commentID, newComment }) => {
			try {
				const updatedCommentData = {
					comment: newComment,
					updated_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
				};

				const updatedCommentID = await updateComment(commentID, updatedCommentData);

				const updatedComment = await getCommentByID(updatedCommentID);

				return { data: updatedComment, success: true, message: 'Comment updated successfully', error: null };
			} catch (error) {
				return {
					data: null,
					success: false,
					message: 'Failed to update comment',
					error: {
						message: error.message,
						code: 'COMMENT_UPDATE_ERROR',
					},
				};
			}
		},
		removeComment: async (_, { commentID }) => {
			try {
				await deleteComment(commentID);
				return { success: true, message: 'Comment deleted successfully', error: null };
			} catch (error) {
				return {
					data: null,
					success: false,
					message: 'Failed to delete comment',
					error: {
						message: error.message,
						code: 'COMMENT_DELETE_ERROR',
					},
				};
			}
		},
	},
	Query: {
		initiatives: async (_, { status, pagination }) => {},
		departments: async () => {
			try {
				const results = await poolQuery(`SELECT * FROM departments;`);
				return results;
			} catch (error) {
				throw error;
			}
		},
		status: async () => {
			try {
				const results = await poolQuery(`SELECT * FROM status;`);
				return results;
			} catch (error) {
				throw error;
			}
		},
		hailstormData: async () => {
			try {
				const res = await axios.get(process.env.HAILSTORM_API);
				return res.data.users;
			} catch (error) {
				throw new Error('Failed to fetch data', error);
			}
		},
		commentID: async (_, { commentID }) => {
			try {
				const comment = await getCommentByID(commentID);

				if (!comment || comment.length === 0) {
					throw new Error('Comment not found');
				}

				return comment[0];
			} catch (error) {
				throw new Error('Failed to fetch comment by ID', error);
			}
		},
		comments: async (_, { postID }) => {
			try {
				const comments = await getAllComments(postID);

				return comments;
			} catch (error) {
				throw new Error('Failed to fetch comments', error);
			}
		},
	},
};

module.exports = resolvers;
