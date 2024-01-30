console.log('menuControl listeners activated');
const login = document.getElementById('login');
const register = document.getElementById('register');
const regClose = document.getElementById('regClose');
const loginLink = document.getElementById('loginLink');
const loginViewBuy = document.getElementById('loginViewBuy');
const regLink = document.getElementById('regLink');
const regLastLink = document.getElementById('regLastLink');
const loginClose = document.getElementById('loginClose');
const loginCloseTiny = document.getElementById('loginCloseTiny');

const ticketsButton = document.getElementById('ticketsButton');
const ticketsCloseButton = document.getElementById('ticketsCloseButton');
const tickets = document.getElementById('tickets');

// Define a mapping of buttons to their corresponding elements
const btnGrp = [
  { button: regClose, element: register },
  { button: regLastLink, element: register },
  { button: loginLink, element: login },
  { button: loginViewBuy, element: login },
  { button: regLink, element: register },
  { button: loginClose, element: login },
  { button: loginCloseTiny, element: login },
  { button: ticketsButton, element: tickets },
  { button: ticketsCloseButton, element: tickets }

];
function btnGrouping(){ 
  btnGrp.forEach(pair => {
    if (pair.button && pair.element) {   
      pair.button.addEventListener('click', () => {
      if(pair.element.style.display=="block"){
        pair.element.style.display="none"
      }else{
        pair.element.style.display="block"
      }
      });
    }
  });
}
btnGrouping()