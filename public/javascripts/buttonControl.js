const toggleCard = document.getElementById('toggleCard');
const toggleFont = document.getElementById('toggleFont');
const toggleDraft = document.getElementById('toggleDraft');
const cardUploadDiv = document.getElementById('cardUploadDiv');
const draftCards = document.getElementById('draftCards');
const uploadFonts = document.getElementById('uploadFonts');

const buttonCtlGroups = [
  { button: toggleCard, div: cardUploadDiv },
  { button: toggleFont, div: uploadFonts },
  { button: toggleDraft, div: draftCards }
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
