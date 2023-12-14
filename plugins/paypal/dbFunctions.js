var express = require('express');
var router = express.Router();
const config = require('../../config/config'); // Import config if you're using it
const { getDb } = require('../../plugins/mongo/mongo');
const lib = require('../../routes/logFunctions/logFunctions');
const { ObjectId } = require('mongodb');

const initiatePaypalOrder = async (req,res)=>{

    try{
    const db = getDb();
    const orders_paypal = db.collection(`orders_paypal`);
    const result = await orders_paypal.findOne({"id":paypalOrderId})
    console.log('initiate pp')
    }
    catch(error){
        console.error(error)
    }
}


module.exports = initiatePaypalOrder;