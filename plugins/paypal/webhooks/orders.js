const express = require('express');
const router = express.Router();
const {initiatePaypalOrder,updatePaypalOrder} = require('../dbFunctions')


const checkouts = async (req, res) => {
    try {
        const eventType = req.body.event_type;
        const orderId = req.body.id; // Order ID is common for all events

        if (eventType == "CHECKOUT.ORDER.COMPLETED") {
            console.log(`Fire finalization`);
            // Call your order finalization logic here

            // Extract payer information
            const payerEmail = req.body.resource.payer.email_address;
            const payerId = req.body.resource.payer.payer_id;
            console.log(`Email: ${payerEmail}, ID: ${payerId}, Order ID: ${orderId}`);

            // Extract purchase units information
            const purchaseUnits = req.body.resource.purchase_units;
            if (purchaseUnits) {
                purchaseUnits.forEach((unit, index) => {
                    console.log(`Purchase Unit ${index + 1}:`);
                    console.log(`Description: ${unit.description}`);
                    console.log(`Amount: ${unit.amount.value} ${unit.amount.currency_code}`);
                    // Add more fields as needed
                });
            }
        } else if (eventType == "CHECKOUT.ORDER.APPROVED") {
            const customId = req.body.resource.purchase_units[0]?.custom_id;
            const status = req.body.resource.status;
            const payerId = req.body.resource.payer.payer_id;
            const payerEmail = req.body.resource.payer.email_address;
            console.log(`Event received: OrderId: ${orderId}, EventType: ${eventType}, Status: ${status}, Custom Id: ${customId}`);
            console.log(`ID: ${payerId}, Email: ${payerEmail}`);
            updatePaypalOrder(orderId, {"paypalCompleted": "true"});
        } else {
            const summary = req.body.summary;
            console.log(`Other hooks: ${eventType}, Summary: ${summary}, Order ID: ${orderId}`);
        }

        res.status(200).send('Event received');
    } catch (error) {
        console.error('Error processing the webhook event:', error);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = checkouts;
