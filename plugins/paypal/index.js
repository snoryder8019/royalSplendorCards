const express = require('express');
const checkouts = require('/webhooks/orders');


router.post('/checkouts', checkouts);
//  PayPal Webhooks
router.use('/checkouts', checkouts);

module.exports = router;