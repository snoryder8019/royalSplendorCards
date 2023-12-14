const express = require('express');
const router = express.Router();

const checkouts = async (req, res) => {
    try {
    //mongo here
        console.log('Webhook event received:',);
        const customId = req.body.resource.purchase_units[0].custom_id;
        const status = req.body.resource.status;     
        const resourceType =  req.body.resource_type;     
        const eventType =  req.body.event_type;     
    

if (customId === null || customId === undefined) {
    // Custom ID is null or undefined, you can move on here
    console.log('Webhook event parsed by scott:',  'status:', status, 'event type:',eventType, 'resource type:', resourceType);
} else {
    console.log('Webhook event parsed by scott:', 'custom id: ',customId, 'status:', status);
    // Custom ID has a value, you can continue with your script
}
        res.status(200).send('Event received');
    } catch (error) {
        console.error('Error processing the webhook event:', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = checkouts;
