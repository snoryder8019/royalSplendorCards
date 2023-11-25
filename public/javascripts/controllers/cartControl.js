function cartDisplay(){
const cart = document.getElementById('cart')
const cartButton = document.getElementById('cartButton')
const cartClose = document.getElementById('cartClose')
const cartGroup = [
    {btn:cartButton,div:cart},
    {btn:cartClose,div:cart}
]

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

    // Select all elements within cartTable with IDs starting with 'itemTotal_'
    const itemTotals = cartTable.querySelectorAll('[id^="itemTotal_"]');

    // Iterate over each element and add its value to the total
    itemTotals.forEach(item => {
        total += parseFloat(item.textContent.substring(1)) || 0; // Remove the '$' and parse to float
    });

    // Update the 'cartTotaled' element with the calculated total
    document.getElementById('cartTotaled').textContent = '$' + total.toFixed(2);
}
function cartDom(){
// Call cartTotaller on page load
document.addEventListener('DOMContentLoaded', cartTotaller);
}
cartDom()
promoDisplay();
cartDisplay();