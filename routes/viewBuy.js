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
const {addToCart,deleteFromCart,fetchCart} = require('./cartFunctions/cartFunctions')
const {createOrder, getOrderDetails, returnPaypalSuccess, getCheckoutAwaiting} = require('../plugins/paypal/paypalFunctions');
const config = require('../config/config')

router.get(('/'),async(req,res)=>{
   // console.log(req.query._id)
    const fonts = getFonts();
    const db = getDb();
    const collection = db.collection('_cards');
    const id=new ObjectId(req.query._id)
    const card = await collection.findOne({"_id":id});
   
    const user = req.user
    //await collection.updateOne({"_id": id}, {$inc: {"views": 1}});
////////////////////

////////////////////
    res.render('viewBuy',{
    user: user, 
    message: req.flash(),
    card:card,  // Pass allCards to your EJS template
    fonts:fonts ,
    config:config
    
})
})

//router.get('/orderDetails',getOrderDetails)
//paypal EPs
router.get('/checkout-awaiting', getCheckoutAwaiting);
router.post('/createOrder', createOrder);
router.get('/order-details/:orderId', getOrderDetails); 
router.get('/return', async (req, res) => {
   // console.log('return viewbuylayer')
    await returnPaypalSuccess(req, res);
});

//Mongo user.cart EP's
router.get('/cart/fetchCart', fetchCart);
router.post('/cart/add', addToCart);
router.post('/cart/delete', deleteFromCart);

module.exports = router;