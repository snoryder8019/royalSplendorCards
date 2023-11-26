var express = require('express');
var router = express.Router();
const pluginsRouter = require('../plugins')
router.use(pluginsRouter);
const flash = require('express-flash');
const { getDb } = require('../plugins/mongo/mongo');
const path = require('path');
const fs = require('fs');
const upload = require('../plugins/multer/setup')
const {isAdmin,uploadCard, deleteCard, getFonts, uploadFonts, updateCard, publishCard} = require('./adminFunctions/adminFunctions')
const { ObjectId } = require('mongodb');
const {addToCart,deleteFromCart} = require('./cartFunctions/cartFunctions')

router.get(('/'),async(req,res)=>{
    console.log(req.query._id)
    const fonts = getFonts();
    const db = getDb();
    const collection = db.collection('_cards');
    const id=new ObjectId(req.query._id)
    const card = await collection.findOne({"_id":id});
   
    const user = req.user
    await collection.updateOne({"_id": id}, {$inc: {"views": 1}});

    res.render('viewBuy',{
    user: user, 
    message: req.flash('message'),
    card:card,  // Pass allCards to your EJS template
    fonts:fonts 
})
})


router.post('/cart/add', addToCart);
router.post('/cart/delete', deleteFromCart);

module.exports = router;