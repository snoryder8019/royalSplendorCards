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

// Define a mapping of buttons to their corresponding elements
const btnGrp = [
  { button: regClose, element: register },
  { button: regLastLink, element: register },
  { button: loginLink, element: login },
  { button: loginViewBuy, element: login },
  { button: regLink, element: register },
  { button: loginClose, element: login },
  { button: loginCloseTiny, element: login }
];
function btnGrouping(){
  console.log('btnGrpnext')

  console.log('pushypushy1')
  btnGrp.forEach(pair => {
    if (pair.button && pair.element) { // Check if elements exist
      console.log('pushypushy2')
      pair.button.addEventListener('click', () => {
        // Toggle the display of the associated element
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