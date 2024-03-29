var express = require('express');
var router = express.Router();
const path = require('path')
const upload = require('../../plugins/multer/setup');
const { getDb } = require('../../plugins/mongo/mongo');
const { ObjectId } = require('mongodb');
const config = require('../../config/config'); // Import config if you're using it
const lib = require('../logFunctions/logFunctions')
const fs = require('fs')
const orderEditor = require('./finalizeOrder')
// isAdmin Middleware
function isAdmin(req, res, next) {
  let user = req.user;
  console.log('ADMIN ACCESS: accessing admin routes: ' + user.displayName);

  if (user && user.isAdmin) {
    next();
  } else {
    req.flash('error', 'Unauthorized. Please log in as an admin.');
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
    let fontName1Path4 = fontName1Path.substring(0, 4).toLowerCase();
    let fontName2Path4 = fontName2Path.substring(0, 4).toLowerCase();
    let initiatePos= -100;
    const cardData = {
      cardFront: cardFrontPath,
      cardBack: cardBackPath,
      //orientation key based on original horizontal design 
      vertical:false,
      imgScale:1,
      imgPositionX: initiatePos,
      imgPositionY: initiatePos,
      imgRotation:0,
      font0Size: 12,
      text0PositionX: initiatePos,
      text0PositionY: initiatePos,
      text0Rotation:0,
   
      textColor:"rbg(0,0,0)",
      font1Size: 12,
      nameStack:false,
      text1PositionX: initiatePos,
      text1PositionY: initiatePos,
      text1Rotation:0,
      text1Color:"rbg(0,0,0)",
      uploadedBy: req.user.displayName,
      fontName1: fontName1Path4,
      fontName2: fontName2Path4,
      preview: "true",
      views: 0,
      likes: 0,
      purchased: 0,
      cardName:"no Name assigned",

    };
    await collection.insertOne(cardData);

    req.flash('success', 'Card uploaded successfully.');
    lib('new card made:', 'no errors', cardData, 'cards.json','data');
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    lib('error making a card:', 'error from lib():' + err, cardData, 'cards.json','data');
    req.flash('error', 'An error occurred while uploading.');
    res.redirect('/admin');
  }
};
//THIS IS NOT BUILT YET
const publishCard = async (req, res) => {
  try {
    const db = getDb();
    const collection = db.collection('_cards');
    const cardID = req.body._id;
    
    // Assuming you have a 'preview' field in your card documents
    const updateResult = await collection.updateOne(
      { "_id": new ObjectId(cardID) },
      { $set: { "preview": false } }
    );

    if (updateResult.modifiedCount === 1) {
      console.log('success', 'Card published successfully.');
      res.redirect('/admin');
    } else {
      console.log('error', 'Card not found or already published.');
      res.redirect('/admin');
    }
  } catch (err) {
    console.error(err);
    req.flash('error', 'An error occurred while publishing.');
    res.redirect('/admin');
  }
};


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
      lib('card deleted:', null, { cardID, userName }, 'cards.json','data');
      req.flash('success', 'Card deleted successfully.');
      res.redirect('/admin');
    } else {
      lib('card not found:', 'error: card not found', { cardID, userName }, 'cards.data','data');
      req.flash('error', 'Card not found.');
      res.redirect('/admin');
    }
  } catch (err) {
    console.error(err);
    lib('error deleting a card:', 'error:' + err, { cardID,userName }, 'cards.json','data');
    req.flash('error', 'An error occurred while deleting.');
    res.redirect('/admin');
  }
};
const uploadFonts = async (req, res) => {
  try {
    const uploadedFonts = req.files.fonts || [];
    const fontPaths = uploadedFonts.map(file => file.path.replace('public', ''));
    //console.log('uploading font(s):', JSON.stringify(uploadedFonts, null, 2));
    
    // You can save these paths to the database if needed
    
    req.flash('success', 'Fonts uploaded successfully.');
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    req.flash('error', 'An error occurred while uploading fonts.');
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
      req.flash('error', 'Card not found.');
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
    let fontName14 = req.body.fontName1.substring(0, 4);
    let fontName24 = req.body.fontName2.substring(0, 4);
    // Update other fields
    updatedCardData.fontName1 = fontName14;
    updatedCardData.fontName2 = fontName24;
    updatedCardData.uploadedBy = req.body.uploadedBy;
    updatedCardData.imgScale = req.body.imgScale;
    updatedCardData.imgPositionX = req.body.imgPositionX;
    updatedCardData.imgPositionY = req.body.imgPositionY;
    
    updatedCardData.text0PositionX = req.body.text0PositionX;
    updatedCardData.text0PositionY = req.body.text0PositionY;
    updatedCardData.font0Size = req.body.font0Size; 
    updatedCardData.textColor = req.body.textColor;
    
    updatedCardData.text1PositionX = req.body.text1PositionX;
    updatedCardData.text1PositionY = req.body.text1PositionY;
    updatedCardData.font1Size = req.body.font1Size; 
    updatedCardData.text1Color = req.body.text1Color;
    updatedCardData.cardName = req.body.cardName;
    
    //newest implimenttaioins
    
    updatedCardData.text0Rotation = req.body.text0Rotation;
    updatedCardData.text1Rotation = req.body.text1Rotation;
    
    updatedCardData.vertical = req.body.vertical;
    updatedCardData.nameStack = req.body.nameStack;
    
    updatedCardData.text2PositionX = req.body.text2PositionX;
    updatedCardData.text2PositionY = req.body.text2PositionY;
    updatedCardData.font2Size = req.body.font2Size; 
    
    // Log the updated card data
    //console.log('Updated Card Data:', updatedCardData);
    
    // Update the document
    const update = await collection.updateOne({ "_id": id }, { $set: updatedCardData });
    //console.log('Updated Card Data:', update);
   
    const userName = req.user.displayName
    lib('card updated:', 'no errors from lib():', { cardID,userName }, 'cards.json','data');
    
    req.flash('success', 'Card updated successfully.');
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    req.flash('error', 'An error occurred while updating.');
    res.redirect('/admin');
  }
};





router.post('/updateCard', upload, updateCard);
router.post('/publishCard', isAdmin, publishCard)
router.post('/uploadCard', upload, uploadCard);
router.post('/deleteCard', deleteCard);


module.exports = { isAdmin, uploadCard, deleteCard, getFonts, uploadFonts, updateCard, publishCard };
