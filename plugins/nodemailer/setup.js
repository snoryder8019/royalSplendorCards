const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

const sendConfirmationEmail = async (to, variables) => {
    const templatePath = path.join(__dirname, 'templates', 'confirmation.html');
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');
  
    htmlTemplate = htmlTemplate.replace('{{firstName}}', variables.firstName);
    htmlTemplate = htmlTemplate.replace('{{confirmationLink}}', variables.confirmationLink);

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Confirm Your Email',
        html: htmlTemplate
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendConfirmationEmail
};
