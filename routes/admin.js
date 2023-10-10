var express = require('express');
var router = express.Router();
const pluginsRouter = require('../plugins')
router.use(pluginsRouter);
const flash = require('express-flash');
const { getDb } = require('../plugins/mongo/mongo');
const path = require('path');
const fs = require('fs');
const upload = require('../plugins/multer/setup')
const {isAdmin,uploadCard} = require('./adminFunctions/adminFunctions')
//THIS IS AN ADMIN PANEL REQUIRING A DB TAG OF isAdmin == "true"


// admin root
// admin root
router.get('/', isAdmin, async (req, res) => {
  let user = req.user;
  
  // Fetch all cards from the database
  const db = getDb();
  const collection = db.collection('_cards');
  const allCards = await collection.find({}).toArray();
  
  res.render('admin', { 
      user: user, 
      message: req.flash('message'),
      allCards: allCards  // Pass allCards to your EJS template
  });
});

router.post('/uploadCard',isAdmin,upload, uploadCard)
module.exports = router;
