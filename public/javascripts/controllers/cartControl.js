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
}}
cartDisplay();