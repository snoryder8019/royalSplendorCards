const express = require('express');
const router = express.Router();

const checkouts = async (req, res) => {
    try {
    //mongo here
    const resourceType =  req.body.resource_type;     
    // const amount = req.body.resource.amount.value 
    const eventType =  req.body.event_type;   
    
    if(eventType=="CHECKOUT.ORDER.APPROVED" || eventType=="CHECKOUT.ORDER.COMPLETED"){
        const orderId = req.body.id
        const status = req.body.resource.status;     
        const payerId = req.body.resource.payer.payer_id;
        const payerEmail = req.body.resource.payer.email_address;
    console.log(`event received:\nOrderId: ${orderId}\nEventType: ${eventType}\nStatus: ${status}`);
    console.log(`id: ${payerId}, email: ${payerEmail} `)

}else{
    console.log(`other hooks: ${eventType}`)
}


        res.status(200).send('Event received');
    } catch (error) {
        console.error('Error processing the webhook event:', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = checkouts;
