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

const orderEditor = async (req,res)=>{
   const userId0 = req.query.userId;
   const cardId0 = req.query.cardId;
   const orderId0 = req.query.orderId;
const userId = new ObjectId(userId0)
const cardId = new ObjectId(cardId0)
const orderId = new ObjectId(orderId0)
   try{
    const db = getDb();
    const cards = db.collection(`_cards`);
    const users = db.collection(`users`);
    const orders = db.collection(`orders_paypal`);
    const card = await cards.findOne({"_id":cardId})
    const user = await users.findOne({"_id":userId})
    const order = await orders.findOne({"_id":orderId})
    console.log(`user data: ${user.email}`)
    console.log(`card data: ${card.cardName}`)
   //  res.send(`you found orderEditor with ${userId} and ${cardId}`)
res.render('orderEditor',{user:user,card:card,order:order})
   }
   catch(error){console.error(error)}
}

module.exports = {finalizeOrder, orderEditor};



