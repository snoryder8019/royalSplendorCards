var express = require('express');
var router = express.Router();
const path = require('path')
const upload = require('../../plugins/multer/setup');
const { getDb } = require('../../plugins/mongo/mongo');
const { ObjectId } = require('mongodb');
const config = require('../../config/config'); // Import config if you're using it
const lib = require('../logFunctions/logFunctions')
const fs = require('fs');
const getUserEditor = async(req,res)=>{
    try{
const db = getDb()
const collection = db.collection('users')
const obId=req.query.id;
const userId =new ObjectId(obId)
console.log(obId)

const user = await collection.findOne({"_id":userId})
res.render('userEditor',{user:user})
    }
    catch(error){
        res.send(`error: ${error}`)
        
    }
}
const postUserEdit = async(req,res)=>{
}





module.exports= {getUserEditor, postUserEdit}