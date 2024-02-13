const nodemailer = require('nodemailer');
const axios = require('axios');
const env = require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { getDb } = require('../mongo/mongo');
const emailStyle0 = require('./styles/emailStyle0');
const config = require('../../config/config');
const querystring = require('querystring');

const emailHeaderUrl = `${config.baseUrl}images/logoTransp.png`;


async function initializeTransporter(tokenName) {
    const db = await getDb();
    const collection = db.collection('tokens');
   // console.log(collection)
    // Find the token document by name
    const tokenDoc = await collection.findOne({ name:"access_tokens"});

    if (!tokenDoc || !tokenDoc.access_token) {
        throw new Error('Valid token not found in database for the given name.');
    }
}
    //console.log(tokenDoc.access_token,tokenDoc.refresh_token)
//MICROSOFT  IMPLIMENTATIONS
//     transporter = nodemailer.createTransport({
//         host: config.emailService,
//         port: 587,
//         secure: false,
//         auth: {
//             type: 'OAuth2',
//             user: process.env.NODEMAILER_USER,
//             clientId: process.env.MS_CID,
//             clientSecret: process.env.MS_SEC,
//             refreshToken: tokenDoc.refresh_token,
//             accessToken: tokenDoc.access_token,
//             expires:tokenDoc.expires
//             // The expires field might not be directly used by Nodemailer; you may need to handle token refresh manually.
//         },
//     });
// }


let transporter = nodemailer.createTransport({
    service: 'Gmail',
    port:587,
    auth:{user: process.env.GMAIL_USER,pass:process.env.GMAIL_PASS}
})



const sendDynamicEmail = async (to, emailType, user, card, dynamicLink, ticket) => {
    await initializeTransporter();
    const settings = {
        confirmation: {
            subject: 'Confirm Your Email',
            templateName: 'confirmation.html'
        },
        passwordReset: {
            subject: 'Password Reset Instructions',
            templateName: 'passwordReset.html'
        },
        orderComplete: {
            subject: 'Your Order is Complete',
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
    }[emailType];
    if (!settings) throw new Error(`Unknown email type: ${emailType}`);

    const templatePath = path.join(__dirname, 'templates', settings.templateName);
    let htmlTemplate = fs.readFileSync(templatePath, 'utf8')
        .replace('{firstName}', user.firstName)
        .replace('{dynamicLink}', dynamicLink)
        .replace('{emailheader}', emailHeaderUrl);

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to,
        subject: settings.subject,
        html: htmlTemplate
    };
    return transporter.sendMail(mailOptions);
};

const oauthCallbackHandler = async (req, res) => {
    const requestBody = querystring.stringify({
        client_id: process.env.MS_CID,
        client_secret: process.env.MS_SEC_VALUE,
        code: req.query.code,
        redirect_uri: 'http://localhost:3000/oauth/callback',
        grant_type: 'authorization_code'
    });

    try {
        const response = await axios.post('https://login.microsoftonline.com/common/oauth2/v2.0/token', requestBody, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        const {token_type,scope, access_token,refresh_token,  expiresIn } = response.data;
        const db = await getDb();
        await db.collection('tokens').updateOne({}, {
            $set: {
                "name":"access_tokens",
                token_type,
                scope,
                access_token,
               refresh_token,

                expires: new Date(Date.now() + expiresIn * 1000)
            }
        }, { upsert: true });
        res.send('Authorization successful. Tokens updated in the database.');
    } catch (error) {
        console.error('Error exchanging authorization code:', error);
        res.status(500).send('Failed to exchange authorization code.');
    }
};

module.exports = {
    sendDynamicEmail,
    oauthCallbackHandler
};
