var express = require('express');
var router = express.Router();
const path = require('path')
const upload = require('../../plugins/multer/setup');
const { getDb } = require('../../plugins/mongo/mongo');
const { ObjectId } = require('mongodb');
const config = require('../../config/config'); // Import config if you're using it
const lib = require('../logFunctions/logFunctions')
const fs = require('fs');
const getUserEditor = async(req,res)=>{
    try{
const db = getDb()
const collection = db.collection('users')
const obId=req.query.id;
const userId =new ObjectId(obId)
console.log(obId)

const user = await collection.findOne({"_id":userId})
res.render('userEditor',{user:user})
    }
    catch(error){
        res.send(`error: ${error}`)
        
    }
}
const postUserEdit = async (req, res) => {
    try {
        const db = getDb();
        const collection = db.collection('users');
        
        const userId = req.body._id; // Assuming you're passing the user ID via a hidden input field in the form
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        const chapter = req.body.chapter;
        const title = req.body.title;

        await collection.updateOne(
            { "_id":new ObjectId(userId) },
            { $set: { 
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "phone": phone,
                "address": address,
                "chapter": chapter,
                "title": title
            }}
        );

        res.redirect('/admin'); // Redirect to admin page after successful edit
    } catch (error) {
        res.send(`Error: ${error}`);
    }
};

const adminRegEmail = async (req, res) => {
    try {
        console.log('admin reg email')
        const db = getDb();
        const collection = db.collection('users');
        const userId = new ObjectId(req.body.userId);

        // Assume email is fetched here if needed
        const userToUpdate = await collection.findOne({ "_id": userId });
        if (!userToUpdate) {
            return res.status(404).json({ message: 'User not found' });
        }

        await collection.updateOne(
            { "_id": userId },
            { $set: { "isConfirmed": true, "confirmedEmail": userToUpdate.email } }
        );

        res.json({ message: 'Success' });
    } catch (error) {
        console.error('Error confirming email:', error);
        res.status(500).json({ message: 'Error', error: error.toString() });
    }
};




module.exports= {getUserEditor, postUserEdit,adminRegEmail}