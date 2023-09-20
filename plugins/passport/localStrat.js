
var express = require('express');
var router = express.Router();
const { getDb } = require('../mongo/mongo');
const bcrypt = require('bcrypt');
const config = require('../../config/config'); 
const mailer = require('../../plugins/nodemailer/setup');
const { generateTokenForUser } = require('../jwt/tokenGenerator');

async function createUser(newUser) {
    const db = getDb();
    const emailCheck = await db.collection('users').findOne({email: newUser.email});
    if(emailCheck) {
        console.log(emailCheck);
        console.log('This email is Taken');
        return null;  // return null to indicate user already exists
    } else {
        const result = await db.collection("users").insertOne(newUser);  
        
        // Fetch the created user and return
        const createdUser = await db.collection("users").findOne({ _id: result.insertedId });
        
        if (createdUser && createdUser.password) {
            let hash = await bcrypt.hash(createdUser.password, 10);
            await db.collection("users").updateOne({ _id: createdUser._id }, { $set: {"password":hash } });
        }
        
        return createdUser;  // return the created user
    }
}

router.post('/regUser', async (req, res) => {
    try {
        const newUser = await createUser({
            provider: 'local', 
            providerId: 'local' + Date.now(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,    
            password: req.body.password,
            isAdmin: false,      
            createdAt: Date.now
        });

        if(newUser && newUser._id) {
            const token = generateTokenForUser({ userId: newUser._id.toString() });
            const confirmationLink = `${process.env.BASE_URL}/confirm/${token}`;

            await mailer.sendConfirmationEmail(newUser.email, {
                firstName: newUser.firstName,
                confirmationLink: confirmationLink
            });

            res.redirect('/');
        } else {
            res.redirect('/'); 
        }
    } catch (err) {
        console.log(err);
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

