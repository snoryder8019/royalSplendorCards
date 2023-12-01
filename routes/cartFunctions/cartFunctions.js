const express = require('express');
const router = express.Router();
const config = require('../../config/config'); // Import config if you're using it
const { getDb } = require('../../plugins/mongo/mongo');
const lib = require('../logFunctions/logFunctions');
const { ObjectId } = require('mongodb');
//////////////////////////
const addToCart = async (req, res) => {
    try {
        const db = getDb();
        const users = db.collection(`users`);
        const cards = db.collection(`_cards`);
        const userId = req.user._id;
        const userIdObj = new ObjectId(userId);
        const itemId = req.body.itemId;
        const cardIdObj = new ObjectId(itemId);
        const package = req.body.package;
        const pkgParts= package.split("|")
        const countReq= pkgParts[0];
        const priceReq= pkgParts[1];
        const result_user = await users.findOne({"_id": userIdObj});
        const result_card = await cards.findOne({"_id": cardIdObj});
        const idName = result_card.cardName.replace(/\s/g,"")
        const punchTime = new Date().getTime()
console.log(new Date().now)
    if(result_user &&result_card){
        const cartItem={ 
            cartItemId:idName+"-"+new Date().getTime(),
            cardName:result_card.cardName,
            cardFront:result_card.cardFront,   
          count:countReq,
          price:priceReq
                }
const cartAddResult = await users.updateOne({"_id":userIdObj},{$push:{"cart":cartItem}},{upsert:false})
    }
        console.log('Added to cart:', itemId, 'for user:', userId);
       res.redirect('/')
        // res.json({ user: result_user, card: result_card });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding item to cart' });
    }
};
const deleteFromCart = async (req, res) => {
    try {
        const db = getDb();
        const users = db.collection('users');
        const userId = req.user._id;
        const userIdObj = new ObjectId(userId);
        const cartItemId = req.body.cartItemId; // Ensure this matches the format in the user's cart

        // Diagnostic logging
        console.log('Attempting to delete:', cartItemId, 'for user:', userId);

        // Ensure the user exists
        const result_user = await users.findOne({ "_id": userIdObj });
        if (!result_user) {
            console.error('User not found:', userId);
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's cart by pulling the item with the matching cartItemId
        const cartDeleteResult = await users.updateOne(
            { "_id": userIdObj },
            { $pull: { "cart": { "cartItemId": cartItemId } } }
        );

        if (cartDeleteResult.modifiedCount === 0) {
            console.error('Item not found in cart:', cartItemId);
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        console.log('Deleted item:', cartItemId, 'for user:', userId);
        res.json({ message: `Item ${cartItemId} removed from cart successfully` });
    } catch (err) {
        console.error('Error in deleteFromCart:', err);
        res.status(500).json({ message: 'Error removing item from cart' });
    }
};
const fetchCart = async (req, res) => {
    try {
        const db = getDb();
        const users = db.collection('users');
        const userId = req.user._id;
        const userIdObj = new ObjectId(userId);

        // Find the user and retrieve the cart
        const result_user = await users.findOne({ "_id": userIdObj }, { projection: { cart: 1 } });

        if (!result_user) {
            console.error('User not found:', userId);
            return res.status(404).send('User not found');
        }

        // Generate HTML for the cart
        let total = 0;

        let cartHtml = result_user.cart.map((item, index) => {
            total += parseFloat(item.price); // Calculate the total
        
            return `
                <tr>
                    <td><img style="width:45px" src="${item.cardFront}"></td>
                    <td>${item.count}</td>
                    <td id="itemTotal_${item.cardId}">$${item.price}</td>
                    <td onclick="deleteFromCart('${item.cartItemId}')">Remove Item</td>
                    <input type="hidden" name="cart[${index}][cardName]" value="${item.cardName}">
                    <input type="hidden" name="cart[${index}][count]" value="${item.count}">
                    <input type="hidden" name="cart[${index}][price]" value="${item.price}">
                    <input type="hidden" name="cart[${index}][cartItemId]" value="${item.cartItemId}">
                </tr>
                </tbody>
            `;
        }).join('');
        
        // Add the total to the cart HTML
        cartHtml += `<p id="cartTotal">Total: $${total.toFixed(2)}</p>`;
        
//add:     <h2 id="cartTotal">Total: $<%= total.toFixed(2) %></h2> to this template
        // Send HTML back to the front end
        res.send(cartHtml);
    } catch (err) {
        console.error('Error in fetchCart:', err);
        res.status(500).send('Error fetching cart');
    }
};



//router.post('/cart/add', addToCart);


module.exports = {addToCart, deleteFromCart, fetchCart};