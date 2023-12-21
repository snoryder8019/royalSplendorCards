const express = require('express');
const router = express.Router();
const {initiatePaypalOrder,updatePaypalOrder} = require('../dbFunctions')


const checkouts = async (req, res) => {
    try {
    //mongo here
    const resourceType =  req.body.resource_type;     
    // const amount = req.body.resource.amount.value 
    const eventType =  req.body.event_type;   
    if(eventType=="CHECKOUT.ORDER.COMPLETED"){
        console.log(`fire finalization`)
        initiatePaypalOrder;
        const orderId = req.body.id
        const payerEmail = req.body.resource.payer.email_address;
        const payerId = req.body.resource.payer.payer_id;
    console.log(`email:${payerEmail} id:${payerId}\nOrder Id: ${orderId}`)
    }
    if(eventType=="CHECKOUT.ORDER.APPROVED"){
  
        const orderId = req.body.id
        const status = req.body.resource.status;     
        const payerId = req.body.resource.payer.payer_id;
        const payerEmail = req.body.resource.payer.email_address;
        console.log(`event received:\nOrderId: ${orderId}\nEventType: ${eventType}\nStatus: ${status}`);
        console.log(`id: ${payerId}, email: ${payerEmail} `)
        updatePaypalOrder("paypalCompleted","true")
        
    }else{
    const orderId = req.body.id
    const summary = req.body.summary;
    console.log(`other hooks: ${eventType}\nsummary: ${summary}, Order Id: ${orderId}`)
}


        res.status(200).send('Event received');
    } catch (error) {
        console.error('Error processing the webhook event:', error);
        res.status(500).send('Internal Server Error');
    }
};


module.exports = checkouts;
