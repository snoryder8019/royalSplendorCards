var express = require('express');
var router = express.Router();
const path = require('path')
const upload = require('../../plugins/multer/setup');
const { getDb } = require('../../plugins/mongo/mongo');
const config = require('../../config/config'); // Import config if you're using it
const lib = require('../logFunctions/logFunctions')
const { ObjectId } = require('mongodb');

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

// ... (existing imports and middleware)
const uploadCard = async (req, res) => {
  try {
    const db = getDb();
    const collection = db.collection(`_cards`);

    const removePublicFromPath = (filePath) => {
      console.log("Before replace:", filePath);
      const newPath = filePath.replace('public', '');
      console.log("After replace:", newPath);
      return newPath;
    };
    
    let cardFrontPath = removePublicFromPath(req.files.cardFront[0].path);
    let cardBackPath = removePublicFromPath(req.files.cardBack[0].path);
    let fontName1Path = removePublicFromPath(req.files.fontName1[0].path);
    let fontName2Path = removePublicFromPath(req.files.fontName2[0].path);

    const cardData = {
      cardFront: cardFrontPath,
      cardBack: cardBackPath,
      imgBottom:0,
      imgLeft:0,
      dataBottom:0,
      dataLeft:0,
      vertical: req.body.vertical === "true",
      uploadedBy: req.user.displayName,
      fontName1: fontName1Path,
      fontName2: fontName2Path,
      preview:"true",
      views:0,
      likes:0,
      purchased:0
    };

    await collection.insertOne(cardData);

    req.flash('message', 'Card uploaded successfully.');
    lib('new card made:','no errors',cardData, 'cards.txt')
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    lib('error making a card:','error from lib():'+err,cardData, 'cards.txt')
    req.flash('message', 'An error occurred while uploading.');
    res.redirect('/admin');
  }
};
 

// const updateCard = async (req,res)=>{
//   try{}
//   catch{}
// }


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

  
  router.post('/uploadCard', upload, uploadCard);
  router.post('/deleteCard', deleteCard);

  
module.exports = { isAdmin, uploadCard, deleteCard };
