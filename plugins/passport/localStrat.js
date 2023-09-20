
var express = require('express');
var router = express.Router();
const { getDb } = require('../mongo/mongo');
const bcrypt = require('bcrypt');
const config = require('../../config/config'); 
async function createUser(newUser) {
    const db = getDb();
    const emailCheck = await db.collection('users').findOne({email: newUser.email});
    if(emailCheck) {
        console.log(emailCheck);
        console.log('This email is Taken');
        return false;  // return false to indicate failure
    } else {
        const result = await db.collection("users").insertOne(newUser);   
        let hash = await bcrypt.hash(newUser.password, 10);
        var myquery = { "providerId": newUser.providerId };
        var newvalues = { $set: {"password":hash } };
        await db.collection("userss").updateOne(myquery, newvalues);     
        console.log(' :new user\n id: ' + result.insertedId);
        return true;  // return true to indicate success
    }
}


router.post('/regUser', async (req, res) => {
    try {
        let success = await createUser({
            provider: 'local', 
            providerId: 'local' + Date.now(),
            name: req.body.name,
            email: req.body.email,    
            password: req.body.password,
            isAdmin: false,      
            createdAt: Date.now
        });

        if(success) {
            res.redirect('/');  // Using redirect instead of render for proper navigation
        } else {
            const user = req.user; 
            res.render('login', {user: user, message: "This email is taken, try again or contact us"}); // Simplified path and options
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
});

module.exports = {
  router: router,
  createUser: createUser
};

