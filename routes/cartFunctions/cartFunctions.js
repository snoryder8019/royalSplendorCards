const express = require('express');
const router = express.Router();

const config = require('../../config/config'); // Import config if you're using it
const { getDb } = require('../../plugins/mongo/mongo');
const lib = require('../logFunctions/logFunctions');
const { ObjectId } = require('mongodb');
//////////////////////////
const addToCart = async (req, res) => {
    try {
        const db = getDb();
        const users = db.collection(`users`);
        const cards = db.collection(`_cards`);
        const userId = req.user._id;
        const userIdObj = new ObjectId(userId);
        const itemId = req.body.itemId;
        const cardIdObj = new ObjectId(itemId);

        const result_user = await users.findOne({"_id": userIdObj});
        const result_card = await cards.findOne({"_id": cardIdObj});

    if(result_user &&result_card){
        const cartItem={ 
          cardId:itemId,
          cardName:result_card.cardName,
          count:100,
          quantity:1,
          
          dateCreated:new Date()
          //
                }
const cartAddResult = await users.updateOne({"_id":userIdObj},{$push:{"cart":cartItem}},{upsert:false})
    }

        console.log('Added to cart:', itemId, 'for user:', userId);
        res.json({ user: result_user, card: result_card });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding item to cart' });
    }
};
const deleteFromCart = async (req, res) => {
    try {
        const db = getDb();
        const users = db.collection(`users`);
        const userId = req.user._id;
        const userIdObj = new ObjectId(userId);
        const cardId = req.body.cardId; // Using cardId to identify the item to delete
        const cardIdObj = new ObjectId(cardId);

        // Ensure the user exists
        const result_user = await users.findOne({ "_id": userIdObj });
        if (!result_user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's cart by pulling the item with the matching cardId
        const cartDeleteResult = await users.updateOne(
            { "_id": userIdObj },
            { $pull: { "cart": { "cardId": cardId } } }
        );

        if (cartDeleteResult.modifiedCount === 0) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        console.log('Deleted item:', cardId, 'for user:', userId);
        res.json({ message: `Item ${cardId} removed from cart successfully` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error removing item from cart' });
    }
};


//router.post('/cart/add', addToCart);


module.exports = {addToCart, deleteFromCart};