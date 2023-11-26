function updateCartUI(data) {
    if (!data || !data.user || !data.user.cart) return;

    const cartTableBody = document.querySelector("#cartTable tbody");
    cartTableBody.innerHTML = '';

    data.user.cart.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.productName}</td>
            <td>${item.count}</td>
            <td>${item.unitPrice}</td>
            <td>${item.quantity || 1}</td>
            <td id="itemTotal_${item.cardId}">$${item.itemTotal}</td>
            <td><button onclick="deleteFromCart('${item.cardId}')">Remove Item</button></td>
        `;

        cartTableBody.appendChild(row);
    });

    // Update other elements like cart total here
}

function addToCart(itemId) {
    fetch('/viewBuy/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle success
        console.log('Success:', data);
        
        // Update the cart UI to reflect the added item
        updateCartUI(data);

        // Display a success message to the user
        displayMessage('Item added to cart successfully', 'success');
        cartTotaller()
    })
    .catch(error => {
        // Handle error
        console.error('Error:', error);
        displayMessage('Failed to add item to cart', 'error');
    });
}

function updateCartUI(data) {
    // Implementation as discussed in previous responses
}

function displayMessage(message, type) {
    // Create and show a message to the user
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = type === 'success' ? 'message-success' : 'message-error';
    document.body.appendChild(messageElement);

    // Remove the message after some time
    setTimeout(() => {
        messageElement.remove();
    }, 3000);
}

function deleteFromCart(cardId) {
    fetch('/viewBuy/cart/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cardId: cardId })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Handle success
        console.log('Success:', data);
        
        function updateCartUIAfterDeletion(cardId) {
            const rowToDelete = document.querySelector(`#itemTotal_${cardId}`).parentNode;
            if (rowToDelete) {
                rowToDelete.remove();
            }
        
            // Re-fetch cart data or manually update the cart total and other elements
        }
        
        // Display a success message to the user
        displayMessage('Item removed from cart successfully', 'success');
        cartTotaller(); // Update cart total if needed
    })
    .catch(error => {
        // Handle error
        console.error('Error:', error);
        displayMessage('Failed to remove item from cart', 'error');
    });
}

function updateCartUIAfterDeletion(cardId) {
    // Find and remove the table row (or other UI element) corresponding to the cardId
    const rowToDelete = document.querySelector(`#itemRow_${cardId}`);
    if (rowToDelete) {
        rowToDelete.remove();
    }

    // Additional UI updates can be made here if needed
}

// The rest of the functions (displayMessage, etc.) remain the same
