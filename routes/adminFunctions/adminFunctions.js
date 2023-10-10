var express = require('express');
var router = express.Router();
const upload = require('../../plugins/multer/setup');
const { getDb } = require('../../plugins/mongo/mongo');
const config = require('../../config/config'); // Import config if you're using it

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
      dataPOS: req.body.dataPOS,
      imgPOS: req.body.imgPOS,
      vertical: req.body.vertical === "true",
      uploadedBy: req.user.displayName,
      fontName1: fontName1Path,
      fontName2: fontName2Path
    };

    await collection.insertOne(cardData);
    req.flash('message', 'Card uploaded successfully.');
    res.redirect('/admin');
  } catch (err) {
    console.error(err);
    req.flash('message', 'An error occurred while uploading.');
    res.redirect('/admin');
  }
};


  
  router.post('/uploadCard', upload, uploadCard);
  
module.exports = { isAdmin, uploadCard };
