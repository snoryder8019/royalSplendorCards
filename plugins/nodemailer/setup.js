const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const emailStyle0 = require('./styles/emailStyle0'); // Import style

// Transporter setup
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

const sendDynamicEmail = async (to, emailType, user, card, dynamicLink) => {
    // Define email subjects and templates based on type
const emailSettings = {
    confirmation: {
        subject: 'Confirm Your Email',
        templateName: 'confirmation.html'
    },
    passwordReset: {
        subject: 'Password Reset Instructions',
        templateName: 'passwordReset.html'
    },
    orderComplete: {
        subject: 'Your Red Hats Trading Cards',
        templateName: 'orderComplete.html'
    },
    orderNotify: {
        subject: 'You have a new Order',
        templateName: 'orderNotify.html'
    }
};

    // Select settings based on email type
    const settings = emailSettings[emailType];
    if (!settings) {
        throw new Error(`Unknown email type: ${emailType}`);
    }

    // Load and process the HTML template
    const templatePath = path.join(__dirname, 'templates', settings.templateName);
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

    // Inline styles into the template
    htmlTemplate = htmlTemplate.replace('/* email-style-placeholder */', emailStyle0);

    // Replace user-specific and dynamic link placeholders
    htmlTemplate = htmlTemplate.replace('{firstName}', user.firstName);
    htmlTemplate = htmlTemplate.replace('{dynamicLink}', dynamicLink);

    // If using card data, add replacement logic here

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: settings.subject,
        html: htmlTemplate
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendDynamicEmail
};


// const emailSettings = {
//     confirmation: {
//         subject: 'Confirm Your Email',
//         templateName: 'confirmation'
//     },
//     passwordReset: {
//         subject: 'Password Reset Instructions',
//         templateName: 'passwordReset'
//     },
//     orderComplete: {
//         subject: 'Your Red Hats Trading Cards',
//         templateName: 'orderComplete'
//     },
//     orderNotify: {
//         subject: 'You have a new Order',
//         templateName: 'orderNotify'
//     }
// };