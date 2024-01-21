
const express = require('express');
const router = express.Router();
const { getDb } = require('../mongo/mongo');
const bcrypt = require('bcrypt');
const { generateTokenForUser } = require('../jwt/tokenGenerator');
const {sendDynamicEmail} = require('../../plugins/nodemailer/setup');
const crypto = require('crypto');

// Function to generate a random reset token
const generateResetToken = () => {
    // Generate a random 32-character hexadecimal token
    const token = crypto.randomBytes(16).toString('hex');
    return token;
};

module.exports = {
    generateResetToken
};


// Function to handle password reset request
const resetPasswordRequest = async (req, res) => {
    try {
        const email = req.body.email;
        const db = getDb();
        const user = await db.collection('users').findOne({ email: email });
        
        if (user) {
            // Generate a reset token here if needed
            const resetToken = generateResetToken(); // Implement this function
            const dynamicLink = `${config.baseUrl}reset-password/${resetToken}`;
            console.log(dynamicLink)
            await sendDynamicEmail(email, 'passwordReset', user, null, dynamicLink);
            return res.status(200).send('Password reset email sent successfully.');
        } else {
            console.log('user not found')
            return res.status(404).send('User not found.');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error');
    }
};
// Function to handle password reset
const resetPassword = async (req, res) => {
    try {
        const token = req.params.token;
        const newPassword = req.body.newPassword;
        const db = getDb();
        
        // Find the user with the given token
        const user = await db.collection('users').findOne({ resetToken: token });
        
        if (user) {
            // Hash and update the new password
            const hash = await bcrypt.hash(newPassword, 10);
            await db.collection('users').updateOne(
                { _id: user._id },
                { $set: { password: hash }, $unset: { resetToken: '' } }
            );
            return res.status(200).send('Password reset successfully.');
        } else {
            return res.status(404).send('Invalid or expired token.');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error');
    }
};
//reset redirect object needed to export
// Object for reset redirect logic (exported as an object)
const resetRedirect = async (req, res) => {

        try {
            // Implement the logic for rendering the reset-password.ejs view here
            // You can retrieve any necessary data and render the view
            res.render('reset-password'); // Adjust this based on your view setup
        } catch (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
    }


module.exports = { resetPasswordRequest, resetPassword, resetRedirect };
