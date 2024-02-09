const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const emailStyle0 = require('./styles/emailStyle0'); // Import style
const config = require('../../config/config');
// Define the URL of your header image
const emailHeaderUrl = `${config.baseUrl}images/logoTransp.png`;

// Transporter setup
const transporter = nodemailer.createTransport({
    host: config.emailService,
    port:587,
    secure: false,
    //requireTLS: true,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
});

const sendDynamicEmail = async (to, emailType, user, card, dynamicLink, ticket) => {
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
        },
        ticketAdded: {
            subject: 'New Ticket Opened',
            templateName: 'newTicket.html'
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

    // Replace user-specific and dynamic link placeholders
    htmlTemplate = htmlTemplate.replace('{firstName}', user.firstName);
    htmlTemplate = htmlTemplate.replace('{dynamicLink}', dynamicLink);
    htmlTemplate = htmlTemplate.replace('{emailheader}', emailHeaderUrl);
    
    // Handling card-specific placeholders
    if (card) {
        // Replace card-specific placeholders with actual data from 'card' object
        // Example: htmlTemplate = htmlTemplate.replace('{cardName}', card.name);
        // Add more replacement logic as per your card object structure
    }
    
    // Handling ticket-specific placeholders for 'ticketAdded'
    if (emailType === 'ticketAdded' && ticket) {
        htmlTemplate = htmlTemplate.replace('{emailheader}', emailHeaderUrl);
        htmlTemplate = htmlTemplate.replace('{userId}', ticket.userId);
        htmlTemplate = htmlTemplate.replace('{userEmail}', ticket.userEmail);
        htmlTemplate = htmlTemplate.replace('{userName}', ticket.userName);
        htmlTemplate = htmlTemplate.replace('{userPhone}', ticket.userPhone);
        htmlTemplate = htmlTemplate.replace('{subject}', ticket.subject);
        htmlTemplate = htmlTemplate.replace('{description}', ticket.description);
        htmlTemplate = htmlTemplate.replace('{status}', ticket.status);
        htmlTemplate = htmlTemplate.replace('{createdAt}', ticket.createdAt);
    }

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: to,
        subject: settings.subject,
        html: htmlTemplate
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
sendDynamicEmail
};
