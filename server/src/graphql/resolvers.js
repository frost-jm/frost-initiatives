const { getAllTags, getTagById, createTag, updateTag, deleteTag } = require('../controllers/tags.controller');
const { getAllPosts, getPostById, createPost, updatePost, deletePost } = require('../controllers/post.controller');

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
		createdInitiative: async (_, { input }) => {
		},
	},
	Query: {
		initiatives: async (_, { status, pagination }) => {
			
		},
	}
};

module.exports = resolvers;
