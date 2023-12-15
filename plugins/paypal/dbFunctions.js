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
    console.log(`initiate pp: ${result}`)
    }
    catch(error){
        console.error(error)
    }
}
const getUserforPaypal = async (userId) => {
    try {
        const db = getDb();
        const users = db.collection('users');
        const user = await users.findOne({"_id": userId}); // Assuming '_id' is the correct field
        console.log(`User fetched: ${user}`);
        return user;
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error for the caller to handle
    }
}

const getCardforPaypal = async (paypalOrderId) => {
    try {
        const db = getDb();
        const cards = db.collection('_cards');
        const card = await cards.findOne({"_id": paypalOrderId}); // Assuming '_id' is the correct field
        console.log(`Card fetched: ${card}`);
        return card;
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error for the caller to handle
    }
}


module.exports = {initiatePaypalOrder, getCardforPaypal, getUserforPaypal};