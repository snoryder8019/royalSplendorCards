const express = require('express');
const router = express.Router();

const checkouts = async (req, res) => {
    try {
        // Assume necessary database and other setup is done here

        // Handle the webhook event here
        console.log('Webhook event received:', req.body);
        const customId = req.body.resource.purchase_units[0].custom_id;
        const customId2 = req.body.resource.purchase_units[0].custom_id2;
        const status = req.body.status;
        console.log('Webhook event parsed by scott:', 'custom id: ',customId,'custom id 2: ',customId2, 'status:', status);

        // Process the received data
        // For example, updating a database, sending notifications, etc.

        // Respond to PayPal to acknowledge receipt
        res.status(200).send('Event received');
    } catch (error) {
        console.error('Error processing the webhook event:', error);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = checkouts;
