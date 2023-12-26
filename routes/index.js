var express = require('express');
var router = express.Router();
const pluginsRouter = require('../plugins');
const upload = require('../plugins/multer/setup');
router.use(pluginsRouter)
const finalizeOrder = require('./adminFunctions/finalizeOrder')
const checkouts = require('../plugins/paypal/webhooks/orders')
const { getDb } = require('../plugins/mongo/mongo');
const flash = require('express-flash');
const {isAdmin,uploadCard, deleteCard, getFonts, uploadFonts, updateCard} = require('./adminFunctions/adminFunctions')
//const userFunctionsRouter = require('./routes/userFunctions/userFunctions'); // Adjust the path as needed
const { userImgUpload, userDataUpload } = require('./userFunctions/userFunctions');
const gatherIp = async (req,res,next)=>{
  let userIp = req.ip
  console.log(`user's IP: ${userIp}`)
  next()
}
// ... other app setup code ...
router.post('/userImgUpload', upload, userImgUpload);
router.post('/checkouts', checkouts);
router.use('/finalizeOrder',finalizeOrder)
router.post('/userDataUpload', userDataUpload)
/* GET home page. */
router.get('/',gatherIp, async (req, res) => {
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
