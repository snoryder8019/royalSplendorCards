const express = require('express');
const router = express.Router();
const { getDb } = require('../../plugins/mongo/mongo');
const lib = require('../logFunctions/logFunctions');

const addToCart = async (req, res) => {
    const db = getDb();
    const userId = req.user._id; // or however you get the user's ID
    const itemId = req.body._id;
    // Logic to add item to the user's cart
    // Respond with success or error message
    console.log('added: ' + itemId);
    console.log('added: ' + userId);
    res.json(itemId)
    // Here you should send a response back to the client
    // e.g., res.json({ success: true, message: 'Item added to cart' });
};



router.post('/addToCart', addToCart);

module.exports = router;