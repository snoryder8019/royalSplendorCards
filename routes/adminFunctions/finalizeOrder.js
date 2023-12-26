const express = require('express');
const router = express.Router();
const { getDb } = require('../../plugins/mongo/mongo');
const { ObjectId } = require('mongodb');
const config = require('../../config/config'); // Import config if you're using it
const {getOrderforPaypal, getCardforPaypal, getUserforPaypal } = require('../../plugins/paypal/dbFunctions');
// Assuming getDb and ObjectId are defined and imported appropriately
// ...

const finalizeOrder =  async (req, res) => {
    try {
        const userId = req.query.userId; // Assuming userId is passed as a query parameter
        const cardId = req.query.cardId; // Assuming cardId is passed as a query parameter
        const customOrderId = req.query.customId
        console.log('FINALIZE()')
        const user = await getUserforPaypal(userId);
        const card = await getCardforPaypal(cardId);
        const customId = await getOrderforPaypal(customOrderId);

        if (!user || !card) {
            res.status(404).send('User or Card not found');
            return;
        }

        res.json({ user, card, customId }); // Send user and card data as JSON
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
};

module.exports = finalizeOrder;



