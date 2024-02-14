//nudge2.js
// Function to handle dragging
function dragElement(element) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
    // Extract card ID from element's ID (assuming ID format is "realName_cardId")
    var cardId = element.id.split('_')[1];
  
    element.onmousedown = dragMouseDown;
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // Get the mouse cursor position at startup
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // Calculate the new cursor position
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // Set the element's new position
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
    }
  
    function closeDragElement() {
      // Stop moving when mouse button is released
      document.onmouseup = null;
      document.onmousemove = null;

      // Check if the element is 'realName' or 'royalTitle' and update corresponding inputs
      if (element.classList.contains('realName')) {
        document.getElementById('text1PositionX_' + cardId).value = element.style.left.replace('px', '');
        document.getElementById('text1PositionY_' + cardId).value = element.style.top.replace('px', '');
      } else if (element.classList.contains('royalTitle')) {
        document.getElementById('text2PositionX_' + cardId).value = element.style.left.replace('px', '');
        document.getElementById('text2PositionY_' + cardId).value = element.style.top.replace('px', '');
      
      } else if (element.classList.contains('textBox')) {
        document.getElementById('text0PositionX_' + cardId).value = element.style.left.replace('px', '');
        document.getElementById('text0PositionY_' + cardId).value = element.style.top.replace('px', '');
      }
    }
  }
  document.querySelectorAll('.realName, .royalTitle,.textBox').forEach(dragElement);
/// Function to adjust font size
function adjustFontSize(cardId, elementId, increase = true) {
  let targetElement = document.getElementById(elementId + '_' + cardId);
  let inputFieldId;

  if (elementId === 'realNameText') {
      inputFieldId = 'font1Size_';
  } else if (elementId === 'royalTitleText') {
      inputFieldId = 'font2Size_';
  }else if(elementId ==='textTitles_') {
     inputFieldId = 'font0Size'
  }

  if (targetElement) {
      let currentSize = parseInt(window.getComputedStyle(targetElement).fontSize);
      currentSize = increase ? currentSize + 1 : currentSize - 1;
      targetElement.style.fontSize = `${currentSize}px`;
console.log(targetElement)
      // Update corresponding input field
      document.getElementById(inputFieldId + cardId).value = currentSize;
  } else {
      console.error('Element not found:', elementId + '_' + cardId);
  }
}

//
// Add event listeners to buttons
// Event listeners for realName font size buttons
document.querySelectorAll('[id^="increaseFont_"]').forEach(button => {
  button.addEventListener('click', function() {
      const cardId = this.id.split('_')[1];
      adjustFontSize(cardId, 'realNameText', true);
  });
});

document.querySelectorAll('[id^="decreaseFont_"]').forEach(button => {
  button.addEventListener('click', function() {
      const cardId = this.id.split('_')[1];
      adjustFontSize(cardId, 'realNameText', false);
  });
});

// Event listeners for royalTitle font size buttons
document.querySelectorAll('[id^="increaseFontRoyal_"]').forEach(button => {
  button.addEventListener('click', function() {
      const cardId = this.id.split('_')[1];
      adjustFontSize(cardId, 'royalTitleText', true);
  });
});

document.querySelectorAll('[id^="decreaseFontRoyal_"]').forEach(button => {
  button.addEventListener('click', function() {
      const cardId = this.id.split('_')[1];
      adjustFontSize(cardId, 'royalTitleText', false);
  });
});
document.querySelectorAll('[id^="realNameFontSizeBtn_"]').forEach(button => {
  button.addEventListener('click', function() {
    const cardId = this.id.split('_')[1];
      adjustFontSize(cardId, true);
  });
});
document.querySelectorAll('[id^="royalTitleFontSizeBtn_"]').forEach(button => {
  button.addEventListener('click', function() {
    const cardId = this.id.split('_')[1];
      adjustFontSize(cardId, true);
  });
});
document.querySelectorAll('[id^="textBoxFontSizeBtn_"]').forEach(button => {
  button.addEventListener('click', function() {
    const cardId = this.id.split('_')[1];
      adjustFontSize(cardId, true);
  });
});


//////////////
  // Apply to all realName elements
  document.querySelectorAll('.realName').forEach(dragElement);
  