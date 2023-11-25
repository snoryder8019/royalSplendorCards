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
