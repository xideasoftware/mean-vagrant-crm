const mail = require("sendgrid").mail;
const sendGrid = require("sendgrid")(process.env.SENDGRID_API_KEY);

module.exports = {
    sendEmail: (sender, receiver, title, content, templateId) => {
        const senderEmail = new mail.Email(sender);
        const receiverEmail = new mail.Email(receiver);
        const emailContent = new mail.Content("text/plain", content);
        const email = new mail.Mail(senderEmail, title, receiverEmail, emailContent);
        email.setTemplateId(templateId);

        const request = sendGrid.emptyRequest({
            method: "POST",
            path: "/v3/mail/send",
            body: email.toJSON()
        });

        return sendGrid.API(request);
    }
};