var express = require('express');
var router = express.Router();
const path = require('path')
const {resizeAndCropImage} = require('../../plugins/sharp/sharp')
const upload = require('../../plugins/multer/setup');
const { getDb } = require('../../plugins/mongo/mongo');
const config = require('../../config/config'); // Import config if you're using it
const lib = require('../logFunctions/logFunctions')
const { ObjectId } = require('mongodb');
const fs = require('fs')

// Function to handle user data upload
async function userDataUpload(req, res) {
  try {
    const db = getDb();
    const user = req.user; // Assuming user data is available via passport authentication
    const collection = db.collection('users'); // Adjust the collection name as needed
    const referredBy= req.body.card_id
    
    // Retrieve user data from the request body
    const { firstName, lastName,chapter, address, email, phone, birthday_month,birthday_day,age,title } = req.body;

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
          birthday_day,
          birthday_month,
          age
          
      
        },
      }
    );

    req.flash('message', 'User data updated successfully.');
    res.redirect(`/viewBuy/?_id=${referredBy}`); // Redirect to the user setup page or any other appropriate page
  } catch (err) {
    console.error(err);
    req.flash('message', 'An error occurred while updating user data.');
    res.redirect(`/viewBuy/?_id=${referredBy}`); // Redirect to the user setup page or any other appropriate page
  }
}
// Function to handle user headshot upload
const userImgUpload = async (req, res) => {
  try {
    console.log('Starting user image upload process.', req.file);
    const db = getDb();
    const user = req.user;
    const collection = db.collection('users');
    
    let referredBy; // Declare referredBy variable here
    if (req.body.card_id) {
      referredBy = req.body.card_id;
      console.log(`referred by: ${referredBy}`);
    }

    const uploadDirectory = path.join(__dirname, '../../public/images/uploads'); // Directory where files are initially uploaded
    const headshotDirectory = path.join(__dirname, '../../public/images/userHeadshots'); // Directory where final images will be stored

    if (req.files && req.files.userImg) {
      const uploadedFile = req.files.userImg[0];
      const originalFilePath = path.join(uploadDirectory, uploadedFile.filename);

      // Use the file path directly
      const headshotPath = `${headshotDirectory}/${uploadedFile.filename}`;

      // Trigger image resizing
      const resizedImagePath = await resizeAndCropImage(
        originalFilePath, // Original file path
        headshotDirectory, // Output directory for final image
        uploadedFile.filename // Output filename
      );

      // Delete the original file from the uploads directory
      fs.unlink(originalFilePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
          // Handle error
        } else {
          console.log('File deleted successfully');
        }
      });
      
      
      

      // Update the user's headshot path in the database
      const result = await collection.updateOne(
        { _id: user._id },
        { $set: { userImg: headshotPath.replace(/^.*[\\\/]/, '') } } // Storing only the filename in the database
      );
      console.log(result);
      console.log('Headshot updated successfully in the database.');

      req.flash('message', 'Headshot updated successfully.');
    } else {
      console.log('No file uploaded.');
      req.flash('message', 'No file uploaded.');
    }

    if (referredBy) {
      res.redirect(`/viewBuy/?_id=${referredBy}`);
    } else {
      res.redirect('/'); // Handle the case when referredBy is not defined
    }
  } catch (err) {
    console.log('Error in user image upload:', err);
    req.flash('message', 'An error occurred while updating the headshot.');
    if (referredBy) {
      res.redirect(`/viewBuy/?_id=${referredBy}`);
    } else {
      res.redirect('/'); // Handle the error case when referredBy is not defined
    }
  }
};




router.post('/userImgUpload', upload, userImgUpload);

router.post('/userDataUpload', userDataUpload)

module.exports = { userDataUpload, userImgUpload };
