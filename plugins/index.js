const express = require('express');
const router = express.Router();
const { connect } = require('./mongo/mongo');  // MongoDB connection logic
const {exporter} = require('./puppeteer/setup')
connect().catch(err => console.error("Failed to connect to MongoDB:", err));
//const checkouts = require('./paypal/webhooks/orders')


const stripeRoutes = require('./stripe');
//router.post('/checkouts', checkouts);
router.use('/stripe', stripeRoutes);
router.get('/exporter', exporter);




const { router: passportRouter } = require('./passport/localStrat');
router.use(passportRouter);

module.exports = router