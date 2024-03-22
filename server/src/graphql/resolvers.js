const { getAllComments, getCommentByID, updateComment, deleteComment, insertComment } = require('../controllers/comment.controller');
const { getAllInitiatives, getInitiativeById, createInitiative, updateInitiative, deleteInitiative, joinInitiative, leaveInitiative } = require('../controllers/post.controller');
const { setVote } = require('../controllers/vote.controller');

const { pool } = require('../config/database');
const poolQuery = require('util').promisify(pool.query).bind(pool);

const { sendEmail } = require('../utils/mailer');

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
		addComment: async (_, { input }) => {
			try {
				const { initiativeID, author, commentor } = input;

				const { id: authorId } = author;
				const { comment } = commentor;

				const commentId = await insertComment({ initiativeID, author: authorId, comment });

				const insertedComment = await getCommentByID(commentId);

				await sendEmail(input);

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
		createdInitiative: async (_, { input }) => {
			try {
				let { post, reason, title, department, created_by } = input;

				if (!post || !reason || !created_by || !title || !department) {
					throw new Error('Missing required field/s');
				}

				let resultID = await createInitiative(input);

				let newInitiative = await getInitiativeById(resultID);

				return {
					data: newInitiative,
					success: true,
					message: 'Initiative created successfully.',
					error: null,
				};
			} catch (error) {
				return {
					data: null,
					success: false,
					message: 'Failed to create initiative.',
					error: {
						message: error.message,
						code: 'INITIATIVE_CREATE_ERROR',
					},
				};
			}
		},
		updateInitiative: async (_, { id, input }) => {
			try {
				let { post, reason, summary, title } = input;
				let current = await getInitiativeById(id);

				if (!current) {
					throw new Error('Initiative not found');
				}

				let newInitiative = {
					post: post || current.post,
					reason: reason || current.reason,
					summary: summary || current.summary,
					title: title || current.title,
					updated_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
				};

				await updateInitiative(id, newInitiative);

				let updatedInitiative = await getInitiativeById(current.id);

				return {
					data: updatedInitiative,
					success: true,
					message: 'Initiative updated successfully',
					error: null,
				};
			} catch (error) {
				return {
					data: null,
					success: false,
					message: 'Initiative update failed',
					error: {
						message: error.message,
						code: 'INITIATIVE_UPDATE_ERROR',
					},
				};
			}
		},
		deleteInitiative: async (_, { id }) => {
			try {
				let current = await getInitiativeById(id);

				if (!current) {
					throw new Error('Initiative not found');
				}

				await deleteInitiative(id);

				return {
					success: true,
					message: 'Initiative deleted!',
					error: null,
				};
			} catch (error) {
				return {
					success: false,
					message: 'Initiative delete failed!',
					error: {
						message: error.message,
						code: 'INITIATIVE_DELETE_ERROR',
					},
				};
			}
		},
		joinInitiative: async (_, { input }) => {
			try {
				const { initiativeId, userId } = input;

				await joinInitiative(initiativeId, userId);

				const currentInitiative = await getInitiativeById(initiativeId);
				return {
					data: currentInitiative,
					success: true,
					message: 'Succesfully joined the initiative',
					error: null,
				};
			} catch (error) {
				return {
					data: null,
					success: false,
					message: 'Failed to join the initiative',
					error: error,
				};
			}
		},
		leaveInitiative: async (_, { input }) => {
			try {
				const { initiativeId, userId } = input;

				await leaveInitiative(initiativeId, userId);

				const currentInitiative = await getInitiativeById(initiativeId);
				return {
					data: currentInitiative,
					success: true,
					message: 'Succesfully left the initiative',
					error: null,
				};
			} catch (error) {
				return {
					data: null,
					success: false,
					message: 'Failed to leave the initiative',
					error: error,
				};
			}
		},
		setVote:async (_, { userId, initiativeId }) => {
			try {

				if(!userId || !initiativeId) {
					throw new Error('Missing required field/s');
				}

			} catch (error) {

			}
		}
	},
	Query: {
		initiatives: async (_, { status, pagination }) => {
			try {
				let initiatives = await getAllInitiatives(status);

				return {
					items: initiatives,
				};
			} catch (error) {
				throw error;
			}
		},
		initiative: async (_, { id }) => {
			try {
				let initiative = await getInitiativeById(id);

				if (!initiative) {
					throw new Error('Initiative not found');
				}

				return initiative[0];
			} catch (error) {
				throw error;
			}
		},
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
