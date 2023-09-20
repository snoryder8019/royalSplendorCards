const express = require('express');
const router = express.Router();
const { connect } = require('./mongo/mongo');  // MongoDB connection logic
// Establish MongoDB connection
connect().catch(err => console.error("Failed to connect to MongoDB:", err));

// Other plugin logic...


const stripeRoutes = require('./stripe');

router.use('/stripe', stripeRoutes);




const { router: passportRouter } = require('./passport/localStrat');
router.use(passportRouter);

module.exports = router