function cartDisplay(){
const cart = document.getElementById('cart')
const cartButton = document.getElementById('cartButton')
const cartClose = document.getElementById('cartClose')
const vbCartButton = document.getElementById('vbCartButton')
const cartGroup = [
  //  {btn:cartButton,div:cart},
    {btn:cartClose,div:cart},
    {btn:vbCartButton,div:cart}

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
    if (!cartTable) {
        console.error("Cart table not found");
        return;
    }

    let total = 0;
    const rows = cartTable.tBodies[0].rows;
    console.log("Number of rows: " + rows.length);

    for (let i = 0; i < rows.length; i++) {
        let priceCell = rows[i].cells[2];
        if (!priceCell) {
            console.error(`Price cell not found in row ${i}`);
            continue; // Skip this row if the price cell is not found
        }

        let priceText = priceCell.textContent.trim();
        if (priceText.startsWith('$')) {
            priceText = priceText.substring(1);
        }

        const price = parseFloat(priceText.replace(/,/g, ''));
        if (isNaN(price)) {
            console.error(`Invalid price in row ${i}: ${priceText}`);
            continue; // Skip this row if the price is not a valid number
        }

        console.log(`Row ${i}: Price - ${price}`);
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
        cartTotalElement.textContent = `Total: ${formattedTotal}`;
    }

    // Also update the 'totalledInput' input element with the calculated total
    const totalInput = document.getElementById('total');
    if (totalInput && cartTotalElement) {
        totalInput.value = cartTotalElement.textContent.substring(1); // Remove the '$'
    }
}

// Call cartTotaller on page load
document.addEventListener('DOMContentLoaded', updateTotalDisplay);

// Ensure to call cartTotaller after any cart update (like item addition or deletion)
// For example: After deleteFromCart or addToCart functions, call cartTotall
document.addEventListener('DOMContentLoaded', function(){
    promoDisplay()
})
//promoDisplay();
cartDisplay();
cartTotaller();