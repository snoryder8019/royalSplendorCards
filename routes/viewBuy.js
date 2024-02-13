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
router.get('/', async (req, res) => {
    const fonts = getFonts();
    const db = getDb();
    const collection = db.collection('_cards');
    const ticketsCollection = db.collection('tickets');

    // Check if user is logged in
    const userId = req.user ? req.user._id : null;

    // Find card by ID
    const id = new ObjectId(req.query._id);
    const card = await collection.findOne({ "_id": id });

    // Find tickets for the current user if logged in
    let userTickets = [];
    if (userId) {
        userTickets = await ticketsCollection.find({ userId: userId }).toArray();
    }

    res.render('viewBuy', {
        user: req.user,
        message: req.flash(),
        card: card,
        fonts: fonts,
        config: config,
        tickets: userTickets
    });
});


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