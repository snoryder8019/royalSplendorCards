const { getDb } = require('../../plugins/mongo/mongo');
const lib = require('../logFunctions/logFunctions');

// Function to handle user data upload
async function userDataUpload(req, res) {
  try {
    const db = getDb();
    const user = req.user; // Assuming user data is available via passport authentication
    const collection = db.collection('users'); // Adjust the collection name as needed

    // Retrieve user data from the request body
    const { chapter, address, email, phone, birthday, upClose } = req.body;

    // Update the user's data in the database
    await collection.updateOne(
      { _id: user._id }, // Assuming you have a user ID in your user model
      {
        $set: {
          chapter,
          address,
          email,
          phone,
          birthday,
          upClose,
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
async function userImgUpload(req, res) {
  try {
    const db = getDb();
    const user = req.user; // Assuming user data is available via passport authentication
    const collection = db.collection('users'); // Adjust the collection name as needed

    // Check if a file was uploaded
    if (req.file) {
      const headshotPath = req.file.path.replace('public', '');

      // Update the user's headshot in the database
      await collection.updateOne(
        { _id: user._id }, // Assuming you have a user ID in your user model
        {
          $set: {
            userImg: headshotPath,
          },
        }
      );

      req.flash('message', 'Headshot updated successfully.');
    } else {
      req.flash('message', 'No file uploaded.');
    }

    res.redirect('/'); // Redirect to the user setup page or any other appropriate page
  } catch (err) {
    console.error(err);
    req.flash('message', 'An error occurred while updating the headshot.');
    res.redirect('/'); // Redirect to the user setup page or any other appropriate page
  }
}

module.exports = { userDataUpload, userImgUpload };
