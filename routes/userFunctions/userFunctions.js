var express = require('express');
var router = express.Router();
const path = require('path')
const upload = require('../../plugins/multer/setup');
const { getDb } = require('../../plugins/mongo/mongo');
const config = require('../../config/config'); // Import config if you're using it
const lib = require('../logFunctions/logFunctions')
const { ObjectId } = require('mongodb');
const fs = require('fs')
const { resizeAndCropImage } = require('../../plugins/sharp/sharp');
// Function to handle user data upload
async function userDataUpload(req, res) {
  try {
    const db = getDb();
    const user = req.user; // Assuming user data is available via passport authentication
    const collection = db.collection('users'); // Adjust the collection name as needed

    // Retrieve user data from the request body
    const { firstName, lastName,chapter, address, email, phone, birthday,title } = req.body;

    // Update the user's data in the database
    await collection.updateOne(
      { _id: user._id }, // Assuming you have a user ID in your user model
      {
        $set: {
          firstName,
          lastName,
          title,
          chapter,
          address,
          email,
          phone,
          birthday,
          
      
        },
      }
    );

    req.flash('message', 'User data updated successfully.');
    res.redirect('/'); // Redirect to the user setup page or any other appropriate page
  } catch (err) {
    console.error(err);
    req.flash('message', 'An error occurred while updating user data.');
    res.redirect('/'); // Redirect to the user setup page or any other appropriate page
  }
}
// Function to handle user headshot upload
const userImgUpload = async (req, res) => {
  try {
    console.log('Starting user image upload process.', req.file);
    const db = getDb();
    const user = req.user;  
    const collection = db.collection('users');

    if (req.files && req.files.userImg) { 
      const uploadedFile = req.files.userImg[0]; // Get the first file in the userImg array
      const filenameWithExtension = uploadedFile.filename; // This should have the extension
      const headshotPath = `/images/userHeadshots/${filenameWithExtension}`;
     
      const resizedImagePath = await resizeAndCropImage(
        uploadedFile.path,
        'path/to/resized', // Set the output directory
        filenameWithExtension
      );
  
      console.log('Headshot path:', headshotPath);

      const result = await collection.updateOne(
        { _id: user._id },
        { $set: { userImg: headshotPath } }
      );
      console.log(result);
      console.log('Headshot updated successfully in the database.');
      req.flash('message', 'Headshot updated successfully.');
    } else {
      console.log('No file uploaded.');
      req.flash('message', 'No file uploaded.');
    }

    res.redirect('/');
  } catch (err) {
    console.log('Error in user image upload:', err);
    req.flash('message', 'An error occurred while updating the headshot.');
    res.redirect('/');
  }
};

router.post('/userImgUpload', upload, userImgUpload);

router.post('/userDataUpload', userDataUpload)

module.exports = { userDataUpload, userImgUpload };
