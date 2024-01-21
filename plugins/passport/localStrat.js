
var express = require('express');
var router = express.Router();
const { getDb } = require('../mongo/mongo');
const bcrypt = require('bcrypt');
const config = require('../../config/config'); 
const mailer = require('../../plugins/nodemailer/setup');
const { generateTokenForUser } = require('../jwt/tokenGenerator');


async function createUser(newUser) {
    const db = getDb();
    const emailCheck = await db.collection('users').findOne({ email: newUser.email });
    if (emailCheck) {
        console.log(emailCheck);
        console.log('This email is Taken');
        return { success: false, message: 'Email is already taken' }; // Return a custom message
    } else {
        const result = await db.collection("users").inse
        rtOne(newUser);
        // Fetch the created user and return
        const createdUser = await db.collection("users").findOne({ _id: result.insertedId });
        
        if (createdUser && createdUser.password) {
            let hash = await bcrypt.hash(createdUser.password, 10);
            await db.collection("users").updateOne({ _id: createdUser._id }, { $set: { "password": hash } });
        }

        return { success: true, user: createdUser }; // Return a success status and the created user
    }
}
router.post('/regUser', async (req, res) => {
    try {
        const createUserResult = await createUser({
            provider: 'local',
            providerId: 'local' + Date.now(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            isAdmin: false,
            createdAt: Date.now(),
            cart: []
        });

        const redirectUrl = req.headers.referer || '/default-route';

        if (createUserResult.success) {
            // Registration and login succeeded
            req.logIn(createUserResult.user, err => {
                if (err) {
                    console.log(err);
                    req.flash('error', 'Login after registration failed.');
                    return res.status(500).send('Error logging in');
                }
                // Flash success message
                req.flash('success', 'Registration successful! Logged in successfully.');
                return res.redirect(redirectUrl);
            });
        } else {
            // Registration failed
            req.flash('error', createUserResult.message); // Display the custom message
            res.redirect(redirectUrl);
        }
    } catch (err) {
        console.log(err);
        req.flash('error', 'Server Error');
        res.status(500).send('Server Error');
    }
});

router.get('/confirm/:token', async (req, res) => {
    const token = req.params.token;
    // Verify the token and activate the user account
    // After verification:
    res.send('Email confirmed successfully!');
});
module.exports = {
  router: router,
  createUser: createUser
};

