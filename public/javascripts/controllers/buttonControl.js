const toggleCard = document.getElementById('toggleCard');
const toggleFont = document.getElementById('toggleFont');
const toggleDraft = document.getElementById('toggleDraft');
const toggleUsers = document.getElementById('toggleUsers');
const toggleOrders = document.getElementById('toggleOrders');
const cardUploadDiv = document.getElementById('cardUploadDiv');
const usersDiv = document.getElementById('users');
const draftCards = document.getElementById('draftCards');
const uploadFonts = document.getElementById('uploadFonts');
const ordersDiv = document.getElementById('orders');

const buttonCtlGroups = [
  { button: toggleCard, div: cardUploadDiv },
  { button: toggleFont, div: uploadFonts },
  { button: toggleDraft, div: draftCards },
  { button: toggleUsers, div:usersDiv  },
  { button: toggleOrders, div:ordersDiv  }

];
function autoClose(){
  for(let i =0;i<buttonCtlGroups.length;i++){
    buttonCtlGroups[i].div.style.display="none"
  }
}

function buttonControl() {
  console.log('buttonControl() ran');
  for (let i = 0; i < buttonCtlGroups.length; i++) {
    const btn = buttonCtlGroups[i].button;
    const div = buttonCtlGroups[i].div;
    btn.addEventListener('click', function () {
      if (div.style.display === "block") {
                div.style.display = 'none';
      } else {
        for(let i =0;i<buttonCtlGroups.length;i++){
          buttonCtlGroups[i].div.style.display='none'
        }
                div.style.display = 'block';
      }
    });
  }
}

buttonControl();
