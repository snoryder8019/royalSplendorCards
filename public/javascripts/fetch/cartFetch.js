function renderEmptyCart() {
    const cartTableBody = document.querySelector("#cartTable tbody");

    // Clear existing cart contents
    cartTableBody.innerHTML = '';

    // Create a row for the empty cart message
    const row = document.createElement('tr');
    const cell = document.createElement('td');
    cell.colSpan = 4; // Span across all columns
    cell.textContent = 'Your cart is empty';
    cell.style.textAlign = 'center';

    // Append the cell to the row, and the row to the tbody
    row.appendChild(cell);
    cartTableBody.appendChild(row);

    // Optionally, handle the total display
    const cartTotalElement = document.getElementById('cartTotaled');
    if (cartTotalElement) {
        cartTotalElement.textContent = '$0';
    }
}

// Call this function when you need to display an empty cart

function updateCartUI(data) {
    if (!data) {
        renderEmptyCart()
        return;
    }

    const cartTableBody = document.querySelector("#cartTable tbody");
    cartTableBody.innerHTML = data; // data is now HTML string
}
function updateCart() {
    fetchAndShowCart()
        .catch(error => {
            console.error('Error updating cart:', error);
            displayMessage('Failed to update cart', 'error');
        });
}


// Fetch cart will now be a request for HTML
async function fetchAndShowCart() {
    try {
        const response = await fetch('/viewBuy/cart/fetchCart', { /* ... */ });
        if (!response.ok) throw new Error('Failed to fetch cart');
        const cartHtml = await response.text();
        updateCartUI(cartHtml);
    } catch (error) {
        console.error('Error:', error);
    }
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
//
function addToCart(itemId, cardNo) {
    const packageSelect = document.getElementById(`cardPackage_${cardNo}`);
    const selectedPackage = packageSelect.value;

    fetch('/viewBuy/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId: itemId, package: selectedPackage })
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
        updateCart() 
        displayMessage('Item added to cart successfully', 'success');
        cartTotaller(); // Update cart total if needed
        cartDisplay()
    })
    .catch(error => {
        // Handle error
        console.error('Error:', error);
        displayMessage('Failed to add item to cart', 'error');
    });
}
function deleteFromCart(cartItemId, userId) {
    console.log(cartItemId, " , ", userId)
    fetch('/viewBuy/cart/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItemId: cartItemId, userId:userId })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        updateCart(); // Fetch and show the updated cart, including recalculating the total
        displayMessage('Item removed from cart successfully', 'success');
    })
    .catch(error => {
        console.error('Error:', error);
        displayMessage('Failed to remove item from cart', 'error');
    });
}


