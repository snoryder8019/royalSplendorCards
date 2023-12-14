var express = require('express');
var router = express.Router();
const pluginsRouter = require('../plugins');
const upload = require('../plugins/multer/setup');
router.use(pluginsRouter)
const checkouts = require('../plugins/paypal/webhooks/orders')
const { getDb } = require('../plugins/mongo/mongo');
const flash = require('express-flash');
const {isAdmin,uploadCard, deleteCard, getFonts, uploadFonts, updateCard} = require('./adminFunctions/adminFunctions')
//const userFunctionsRouter = require('./routes/userFunctions/userFunctions'); // Adjust the path as needed
const { userImgUpload, userDataUpload } = require('./userFunctions/userFunctions');

// ... other app setup code ...
router.post('/userImgUpload', upload, userImgUpload);
router.post('/checkouts', checkouts);

router.post('/userDataUpload', userDataUpload)
/* GET home page. */
router.get('/', async (req, res) => {
  let user = req.user;
 // Fetch all cards from the database
 const fonts = getFonts();
 const db = getDb();
 const collection = db.collection('_cards');
 const allCards = await collection.find({}).toArray();
 
 res.render('index', { 
     user: user, 
     message: req.flash('message'),
     allCards: allCards,  // Pass allCards to your EJS template
     fonts:fonts 
 });
});




module.exports = router;
