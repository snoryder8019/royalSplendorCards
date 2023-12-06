console.log('menuControl is listeners activated');

const loginClose = document.getElementById('loginClose');
const login = document.getElementById('login');
const loginButton = document.getElementById('loginButton');
const tinyLogin = document.getElementById('tinyLogin');
const viewBuyLogin = document.getElementById('viewBuyLogin');
const avatar = document.getElementById('avatar');
const loginLink = document.getElementById('loginLink');
const register = document.getElementById('register');
const registerButton = document.getElementById('registerButton');

const menuGroup = [login, register];
const enlargeButtons = [avatar, loginClose, loginButton, viewBuyLogin, loginLink];

function shrinkGroup(group) {
  for (let i = 0; i < group.length; i++) {
    if (group[i]) { // Null check
      console.log('shrink ' + group[i].id);
      group[i].style.display = "none";
    }
  }
}

function enlarge() {
  shrinkGroup(menuGroup);
  for (let i = 0; i < enlargeButtons.length; i++) {
    if (enlargeButtons[i]) { // Null check
      console.log('enlarge activated on :' + i);
      enlargeButtons[i].addEventListener('click', () => {
        if (login && login.style.display === "block") {
          shrinkGroup(menuGroup[i]);
        } else {
          console.log('enlarge else');
          shrinkGroup(menuGroup[i]);
          if (login) {
            login.style.display = 'block';
          }
          if(register){
            register.style.display="block";
          }
        }
      });
    }
  }
}

function registerLarge() {
 // if (register && login && registerButton) {
    if (register.style.display === "block") {
      register.style.display = "none";
      login.style.display = "block";
      registerButton.style.display = "block";
    } else {
      register.style.display = "block";
      login.style.display = "none";
      registerButton.style.display = "none";
    }
 // }
}

enlarge();
