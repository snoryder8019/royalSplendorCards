const express = require('express');
const router = express.Router();

const checkouts = async (req, res) => {
    try {
        // Assume necessary database and other setup is done here

        // Handle the webhook event here
        console.log('Webhook event received:', req.body);
        const customId = req.body.resource.purchase_units[0].custom_id;
    
        const status = req.body.resource.status;
     
        console.log('Webhook event parsed by scott:', 'custom id: ',customId, 'status:', status);

        // Process the received data
        // For example, updating a database, sending notifications, etc.

        // Respond to PayPal to acknowledge receipt
        res.status(200).send('Event received');
    } catch (error) {
        console.error('Error processing the webhook event:', error);
        res.status(500).send('Internal Server Error');
    }
};

const pendingOrders = async (req,res) =>{
console.log(details)
res.status(200)
}
module.exports = {checkouts, pendingOrders};
