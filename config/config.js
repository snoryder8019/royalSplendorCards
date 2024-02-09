const env = require('dotenv').config()
const config = 
{
    //breaking changes below
    "env":"dev",//test,prod,
    "app_name":"rhsCards",
    "DB_NAME":"rhsCards", 
    "baseUrl": process.env.BASE_URL,
    'ticketsEmail':"scott@w2marketing.biz",
    "emailService":"smtp.office365.com",
    //end breakiung changes
    //**********
    //custom changes below
    "title":"RHS - TRADING CARDS",
    "headline":"Red Hats Society ~ Trading Cards",
    "companyPaypal":process.env.PPAL_CID,
    "baseShipping":"9.00",
    "baseTransaction":"1.00"
}
module.exports = config