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
          quantity:100,
          dateCreated:new Date()
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

//router.post('/cart/add', addToCart);


module.exports = addToCart;