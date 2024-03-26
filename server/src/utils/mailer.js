require('dotenv').config();

const postmark = require('postmark');
const client = new postmark.Client(process.env.POSTMARK_API_KEY);

async function sendEmail(comments) {
	try {
		const date = new Date();
		const options = { month: 'long', day: 'numeric', year: 'numeric' };
		const formattedDate = date.toLocaleString('en-US', options).replace(', ', ', ');

		const { author, initiativeTitle } = comments[0];

		const commentData = comments.map(({ commentor }) => {
			return {
				commenter_name: commentor.name,
				body: commentor.comment,
				timestamp: formattedDate,
				initials: commentor.initials,
			};
		});

		const templateModel = {
			comments: commentData,
			notifications_url: 'where the link goes',
			pitch_name: initiativeTitle,
			action_url: '#',
		};

		await client.sendEmailWithTemplate({
			From: process.env.POSTMARK_SENDER,
			To: author.email,
			TemplateAlias: process.env.POSTMARK_TEMPLATE_ALIAS,
			TemplateModel: templateModel,
		});
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	sendEmail,
};
