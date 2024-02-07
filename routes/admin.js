var express = require('express');
var router = express.Router();
const pluginsRouter = require('../plugins')
router.use(pluginsRouter);
const flash = require('express-flash');
const { getDb } = require('../plugins/mongo/mongo');
const path = require('path');
const fs = require('fs');
const os = require('os')
const upload = require('../plugins/multer/setup')
const {isAdmin,uploadCard, deleteCard, getFonts, uploadFonts, updateCard, publishCard} = require('./adminFunctions/adminFunctions')
//THIS IS AN ADMIN PANEL REQUIRING A DB TAG OF isAdmin == "true"
const {readLogFile} = require('../routes/systemFunctions/systemFunctions')
const gatherIp = async (req,res,next)=>{
  let userIp = req.ip
  console.log(`user's IP: ${userIp}`)
next()
}
// admin root
// admin root
router.get('/',gatherIp, isAdmin, async (req, res) => {
  let user = req.user;
  
  // Fetch all cards from the database
  const fonts = getFonts();
  const db = getDb();
  const collection = db.collection('_cards');
  const allCards = await collection.find({}).toArray();
  const collection2= db.collection('users')
  const users = await collection2.find({}).toArray()
  const collection3= db.collection('orders_paypal')
  const ordersPaypal = await collection3.find({}).toArray()
  const collection4= db.collection('tickets')
  const tickets = await collection4.find({}).toArray()
  //console.log(users)
const logs = {}

logs.passReset = await readLogFile(`/royalSplendorCards/logs/passReset.json`)
const pRParsed = JSON.parse(logs.passReset)
logs.passReset = pRParsed
logs.errors = await readLogFile(`/royalSplendorCards/logs/errors.json`)
const eRParsed = JSON.parse(logs.errors)
logs.errors = eRParsed
const system = {
  totalmem: os.totalmem(),
  freemem: os.freemem(),
  cpus: os.cpus().length, // Number of CPUs
  uptime: os.uptime() // System uptime in seconds
};
console.log(logs)
  res.render('admin', { 
      user: user, 
      message: req.flash(),
      allCards: allCards,  // Pass allCards to your EJS template
      fonts:fonts,
      users:users,
      ordersPaypal:ordersPaypal ,
      tickets:tickets,
      logs:logs,
      system:system
  });
});

router.post('/publishCard',isAdmin,publishCard)
router.post('/updateCard', upload, updateCard);
router.post('/uploadFonts', isAdmin, upload, uploadFonts);
router.post('/uploadCard',isAdmin,upload, uploadCard)
router.post('/deleteCard',isAdmin, deleteCard)
module.exports = router;
