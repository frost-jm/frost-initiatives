require('dotenv').config();

const postmark = require('postmark');
const client = new postmark.Client(process.env.POSTMARK_API_KEY);

async function sendEmail(data) {
	const { commentor, author, initiativeTitle } = data;

	const date = new Date();
	const options = { month: 'long', day: 'numeric', year: 'numeric' };
	const formattedDate = date.toLocaleString('en-US', options).replace(', ', ', ');
	try {
		return await client.sendEmailWithTemplate({
			From: process.env.POSTMARK_SENDER,
			To: author.email,
			//TemplateId: process.env.POSTMARK_TEMPLATE_ID,
			TemplateAlias: process.env.POSTMARK_TEMPLATE_ALIAS,
			TemplateModel: {
				commenter_name: commentor.name,
				body: commentor.comment,
				timestamp: formattedDate,
				notifications_url: 'where the link goes', // to be updated
				pitch_name: initiativeTitle,
				initials: commentor.initials,
			},
		});
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	sendEmail,
};
