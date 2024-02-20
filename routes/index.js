var express = require('express');
var router = express.Router();
const pluginsRouter = require('../plugins');
const upload = require('../plugins/multer/setup');
router.use(pluginsRouter)
const system = require('./systemFunctions/systemFunctions')
const {finalizeOrder, orderEditor, updateOrderPaypal} = require('./adminFunctions/finalizeOrder')
const checkouts = require('../plugins/paypal/webhooks/orders')
const { getDb } = require('../plugins/mongo/mongo');
const flash = require('express-flash');
const noNos = require('./securityFunctions/forbiddens')
const {ticketUpdate,ticketDelete, ticketData} = require('./adminFunctions/ticketFunctions')
const {resetPasswordRequest, resetPassword, handleResetPasswordGet} = require('../plugins/passport/passwordReset')
const {isAdmin,uploadCard, deleteCard, getFonts, uploadFonts, updateCard} = require('./adminFunctions/adminFunctions')
//const userFunctionsRouter = require('./routes/userFunctions/userFunctions'); // Adjust the path as needed
const {getUserEditor,postUserEdit} = require('./adminFunctions/userControl')
const { userImgUpload, userDataUpload, submitTicket, saveRotation } = require('./userFunctions/userFunctions');
const {updateBanned}=require('./securityFunctions/updateBanned');

const gatherIp = async (req,res,next)=>{
  let userIp = req.ip
  console.log(`user's IP: ${userIp}`)
  next()
}
// ... other app setup code ...

router.post('/updateOrderPaypal', updateOrderPaypal)
router.get('/orderEditor', orderEditor)
router.post('/userImgUpload', upload, userImgUpload);
router.post('/checkouts', checkouts);
router.use('/finalizeOrder',finalizeOrder)
router.post('/userDataUpload', userDataUpload)
router.post('/saveRotation',saveRotation)
router.post('/submitTicket', submitTicket);
router.get('/ticketData',ticketData)
router.post('/reset-password-request', resetPasswordRequest)
router.post('/passwordReset/:token', resetPassword)
router.get('/reset-password/:token', handleResetPasswordGet);
router.post('/ticketUpdate', ticketUpdate);
router.post('/ticketDelete', ticketDelete);
router.post('/updateBanned', updateBanned);

router.post('/postUserEdit',postUserEdit)
router.get('/userEditor',getUserEditor)
router.post('/userEdit/:id',postUserEdit)

//router.post('/ticketNotify', ticketNotify);


/* GET home page. */
router.get('/',noNos, async (req, res) => {
  let user = req.user;
 // Fetch all cards from the database
 const fonts = getFonts();
 const db = getDb();
 const collection = db.collection('_cards');
 const allCards = await collection.find({}).toArray();
 //const message= req.flash()
// console.log(req.flash('message'))
 res.render('index', { 
     user: user, 
     message: req.flash(),
     allCards: allCards,  // Pass allCards to your EJS template
     fonts:fonts 
 });
});




module.exports = router;
