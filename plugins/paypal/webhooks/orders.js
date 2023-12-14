const express = require('express');
const router = express.Router();

const checkouts = async (req, res) => {
    try {
    //mongo here
        console.log('Webhook event received:', req.body);
        const customId = req.body.resource.purchase_units[0].custom_id;    
        const status = req.body.resource.status;     
        console.log('Webhook event parsed by scott:', 'custom id: ',customId, 'status:', status);
        res.status(200).send('Event received');
    } catch (error) {
        console.error('Error processing the webhook event:', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = checkouts;
