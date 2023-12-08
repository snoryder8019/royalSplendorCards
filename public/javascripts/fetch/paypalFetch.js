
  function capturePendingOrder(details){
    fetch('/pendingOrders', {
        method: 'POST', // Assuming you're creating or updating an order
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Order updated:', data);
        // Additional logic to handle the successful response
      })
      .catch(error => {
        console.error('Error updating order:', error);
      });
  }