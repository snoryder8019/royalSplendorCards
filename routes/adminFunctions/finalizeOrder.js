const express = require('express');
const router = express.Router();
const { getDb } = require('../../plugins/mongo/mongo');
const { ObjectId } = require('mongodb');
const config = require('../../config/config'); // Import config if you're using it
const {getOrderforPaypal, getCardforPaypal, getUserforPaypal } = require('../../plugins/paypal/dbFunctions');


const updateOrderPaypal = async (req, res) => {
  try {
      const orderId = req.body.orderId;
      const orderIdd = new ObjectId(orderId);

      const { sentToPrint, paypalCompleted, paypalCanceled, trackingId } = req.body;
console.log(orderId)
      const db = getDb();
      const orders = db.collection('orders_paypal');

      const result = await orders.updateOne(
          { _id: orderIdd },
          { $set: { sentToPrint, paypalCompleted, paypalCanceled, trackingId } }
      );

      if (result.matchedCount === 1) {
          res.redirect('/admin'); // Redirect to /admin after successful update
      } else {
          res.status(404).send('Order not found');
      }
  } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).send('Server error');
  }
};


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

const orderEditor = async (req, res) => {
    const { userId: userId0, cardId: cardId0, orderId: orderId0 } = req.query;
  
    // Convert to ObjectId safely
    const toObjectId = (id) => {
      try {
        return new ObjectId(id);
      } catch (error) {
        return null;
      }
    };
  
    const userId = toObjectId(userId0);
    const cardId = toObjectId(cardId0);
    const orderId = toObjectId(orderId0);
  
    // Check if any IDs are invalid
    if (!userId || !cardId || !orderId) {
      return res.render('error', { error: 'Invalid ID provided' });
    }
  
    try {
      const db = getDb();
      const cards = db.collection('_cards');
      const users = db.collection('users');
      const orders = db.collection('orders_paypal');
  
      const card = await cards.findOne({ "_id": cardId });
      const user = await users.findOne({ "_id": userId });
      const order = await orders.findOne({ "_id": orderId });
  
      if (!user || !card || !order) {
        throw new Error('One or more items not found');
      }
  
      console.log(`User data: ${user.email}`);
      console.log(`Card data: ${card.cardName}`);
  
      res.render('orderEditor', { user, card, order });
    } catch (error) {
      console.error('Error in orderEditor:', error);
      res.render('error', { error: error.message });
    }
  };

module.exports = {finalizeOrder, orderEditor, updateOrderPaypal};



