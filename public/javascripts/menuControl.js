console.log('menuControl is listeners activated');
const loginClose = document.getElementById('loginClose')
const login = document.getElementById('login');
const avatar = document.getElementById('avatar');
const register = document.getElementById('register')
const registerButton = document.getElementById('registerButton')
const menuGroup = [login];
const enlargeButtons = [avatar,loginClose]

function shrinkGroup(group) {
  for (let i = 0; i < group.length; i++) {
    console.log('shrink ' + group[i].id); // log the id of the element being shrunk
    group[i].style.display = "none";
  }
}

function enlarge() {
    shrinkGroup(menuGroup);
    for (let i=0;i<enlargeButtons.length;i++){
  enlargeButtons[i].addEventListener('click', () => {
    if (login.style.display === "block"||register.style.display==="block"){
      shrinkGroup(menuGroup);
    } else {
        console.log('enlarge else');
        shrinkGroup(menuGroup);
        login.style.display = 'block';
    }
  });
}
}
function registerLarge(){
if (register.style.display==="block"){
    register.style.display="none"
    login.style.display="block"
    registerButton.style.display="block"
}else{
    register.style.display="block"
    login.style.display="none"
    registerButton.style.display="none"
    
}
}


enlarge();
