function cartDisplay(){
const cart = document.getElementById('cart')
const cartButton = document.getElementById('cartButton')
const cartClose = document.getElementById('cartClose')
const cartGroup = [
    {btn:cartButton,div:cart},
    {btn:cartClose,div:cart}
];
for(let i=0;i<cartGroup.length;i++){
cartGroup[i].btn.addEventListener('click',function(){
    console.log('cartclicked')
    if(cartGroup[i].div.style.display=='block'){
        cartGroup[i].div.style.display="none"
    }else{cartGroup[i].div.style.display="block"}
})
}
}

function promoDisplay(){
    const promoInput = document.getElementById('promoInput')
    const promoMessage = document.getElementById('promoMessage')
    promoInput.addEventListener("input", function(event){
        let eventInput = event.target.value.toLowerCase()
      if(eventInput=='10redhats'){
        promoMessage.style.display="block"
      }else{
        promoMessage.style.display="none"
      }
    })
}

function cartTotaller() {
    const cartTable = document.getElementById('cartTable');
    let total = 0;

    const rows = cartTable.tBodies[0].rows;
    console.log("Number of rows: " + (rows.length - 1)); // Log number of rows processed

    for (let i = 0; i < rows.length - 1; i++) {
        const priceText = rows[i].cells[2].textContent.substring(1).replace(/,/g, ''); // Remove $ and commas
        const price = parseFloat(priceText);

        console.log(`Row ${i}: Price - ${priceText} (parsed: ${price})`);

        total += price;
    }

    console.log(`Subtotal (before shipping and discount): ${total}`);

    const shippingCost = 9.00;
    total += shippingCost;

    console.log(`Total after adding shipping: ${total}`);

    const promoInput = document.getElementById('promoInput');
    if (promoInput && promoInput.value.toLowerCase() === '10redhats') {
        total *= 0.90; // Apply a 10% discount
        console.log(`Total after applying discount: ${total}`);
    }

    const formattedTotal = '$' + total.toFixed(2);
    console.log(`Final formatted total: ${formattedTotal}`);

    updateTotalDisplay(formattedTotal);
}

function updateTotalDisplay(formattedTotal) {
    // Update the 'cartTotaled' element with the calculated total
    const cartTotalElement = document.getElementById('cartTotal');
    if (cartTotalElement) {
        cartTotalElement.textContent = formattedTotal;
    }

    // Also update the 'totalledInput' input element with the calculated total
    const totalInput = document.getElementById('totalledInput');
    if (totalInput && cartTotalElement) {
        totalInput.value = cartTotalElement.textContent.substring(1); // Remove the '$'
    }
}

// Call cartTotaller on page load
document.addEventListener('DOMContentLoaded', updateTotalDisplay);

// Ensure to call cartTotaller after any cart update (like item addition or deletion)
// For example: After deleteFromCart or addToCart functions, call cartTotall

promoDisplay();
cartDisplay();
cartTotaller();