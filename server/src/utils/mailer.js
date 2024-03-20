require('dotenv').config();

const postmark = require('postmark');
const client = new postmark.Client(process.env.POSTMARK_API_KEY);

async function sendEmail(templateId, model) {
	try {
		return await client.sendEmailWithTemplate({
			From: process.env.POSTMARK_SENDER,
			To: 'jm.delasalas@frostdesigngroup.com',
			TemplateId: process.env.POSTMARK_TEMPLATE_ID,
			TemplateModel: model,
		});
	} catch (error) {
		console.error(error);
	}
}

module.exports = {
	sendEmail,
};
