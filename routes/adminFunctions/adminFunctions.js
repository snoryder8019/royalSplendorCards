var express = require('express');
var router = express.Router();
const path = require('path')
const upload = require('../../plugins/multer/setup');
const { getDb } = require('../../plugins/mongo/mongo');
const config = require('../../config/config'); // Import config if you're using it
const lib = require('../logFunctions/logFunctions')
const { ObjectId } = require('mongodb');
const fs = require('fs')

// isAdmin Middleware
function isAdmin(req, res, next) {
  let user = req.user;
  console.log('accessing admin routes: ' + user.displayName);

  if (user && user.isAdmin) {
    next();
  } else {
    req.flash('message', 'Unauthorized. Please log in as an admin.');
    res.redirect('/');
  }
}

const getFonts = () => {
  const fontDir = path.join(__dirname, '../../public/fonts');
  return fs.readdirSync(fontDir);
};


// ... (existing imports and middleware)
const uploadCard = async (req, res) => {
  try {
    const db = getDb();
    const collection = db.collection(`_cards`);

    const removePublicFromPath = (filePath) => {
      const newPath = filePath.replace('public', '');
      return newPath;
    };

    let cardFrontPath = removePublicFromPath(req.files.cardFront[0].path);
    let cardBackPath = removePublicFromPath(req.files.cardBack[0].path);

    // Get the list of available fonts
    const availableFonts = getFonts();

    // Match the selected font names with available fonts
    const selectedFontName1 = req.body.fontName1;
    const selectedFontName2 = req.body.fontName2;

    const fontName1Path = availableFonts.includes(selectedFontName1) ? `/fonts/${selectedFontName1}` : null;
    const fontName2Path = availableFonts.includes(selectedFontName2) ? `/fonts/${selectedFontName2}` : null;

    const cardData = {
      cardFront: cardFrontPath,
      cardBack: cardBackPath,
      imgScale:1,
      imgPositionX: 0,
      imgPositionY: 0,
      font0Size: 12,
      text0PositionX: 0,
      text0PositionY: 0,
      uploadedBy: req.user.displayName,
      fontName1: fontName1Path,
      fontName2: fontName2Path,
      preview: "true",
      views: 0,
      likes: 0,
      purchased: 0
    };

    await collection.insertOne(cardData);

    req.flash('message', 'Card uploaded successfully.');
    lib('new card made:', 'no errors', cardData, 'cards.txt');
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    lib('error making a card:', 'error from lib():' + err, cardData, 'cards.txt');
    req.flash('message', 'An error occurred while uploading.');
    res.redirect('/admin');
  }
};
//THIS IS NOT BUILT YET
const publishCard = async (req,res)=>{
  try{}
  catch{}
}

//THIS WORKS!!
const deleteCard = async (req, res) => {
  try {
    const db = getDb();
    const collection = db.collection('_cards');
    const cardID = req.body._id;
    const userName = req.user.displayName
    const id = new ObjectId(cardID);

    const result = await collection.deleteOne({ "_id": id });

    if (result.deletedCount === 1) {
      lib('card deleted:', 'no errors', { cardID, userName }, 'cards.txt');
      req.flash('message', 'Card deleted successfully.');
      res.redirect('/admin');
    } else {
      lib('card not found:', 'no errors', { cardID, userName }, 'cards.txt');
      req.flash('message', 'Card not found.');
      res.redirect('/admin');
    }
  } catch (err) {
    console.error(err);
    lib('error deleting a card:', 'error from lib():' + err, { cardID,userName }, 'cards.txt');
    req.flash('message', 'An error occurred while deleting.');
    res.redirect('/admin');
  }
};
const uploadFonts = async (req, res) => {
  try {
    const uploadedFonts = req.files.fonts || [];
    const fontPaths = uploadedFonts.map(file => file.path.replace('public', ''));
    console.log('uploading font(s):', JSON.stringify(uploadedFonts, null, 2));

    // You can save these paths to the database if needed
    
    req.flash('message', 'Fonts uploaded successfully.');
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    req.flash('message', 'An error occurred while uploading fonts.');
    res.redirect('/admin');
  }
};




const updateCard = async (req, res) => {
  console.log('updating card')
  try {
    const db = getDb();
    const collection = db.collection('_cards');
    const cardID = req.body.cardId;
    const id = new ObjectId(cardID);

    // Fetch existing data
    const existingCard = await collection.findOne({ "_id": id });
    if (!existingCard) {
      req.flash('message', 'Card not found.');
      return res.redirect('/admin');
    }

    // Initialize with existing data
    let updatedCardData = { ...existingCard };

    // Check if new files are uploaded
    if (req.files.cardFrontFile) {
      updatedCardData.cardFront = removePublicFromPath(req.files.cardFrontFile[0].path);
    }
    if (req.files.cardBackFile) {
      updatedCardData.cardBack = removePublicFromPath(req.files.cardBackFile[0].path);
    }

    // Update other fields
    updatedCardData.fontName1 = req.body.fontName1;
    updatedCardData.fontName2 = req.body.fontName2;
    updatedCardData.uploadedBy = req.body.uploadedBy;

    // Update the document
    await collection.updateOne({ "_id": id }, { $set: updatedCardData });

    req.flash('message', 'Card updated successfully.');
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    req.flash('message', 'An error occurred while updating.');
    res.redirect('/admin');
  }
};


  router.post('/updateCard', upload, updateCard);
  router.post('/uploadCard', upload, uploadCard);
  router.post('/deleteCard', deleteCard);

  
module.exports = { isAdmin, uploadCard, deleteCard, getFonts, uploadFonts, updateCard };
