const express = require('express');
const router = express.Router();

const checkouts = async (req, res) => {
    try {
    //mongo here
        console.log('Webhook event received:',);
      
        const status = req.body.resource.status;     
        const resourceType =  req.body.resource_type;     
        const eventType =  req.body.event_type;     
    

        res.status(200).send('Event received');
    } catch (error) {
        console.error('Error processing the webhook event:', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = checkouts;
