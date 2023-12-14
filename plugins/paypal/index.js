const express = require('express');
const router = express.Router();
const checkouts = require('./webhooks/orders');


router.get('/checkouts', checkouts);
//router.get('/pendingOrders', pendingOrders);
//  PayPal Webhooks


module.exports = router;