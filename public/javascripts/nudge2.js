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
      // Update input values
      document.getElementById('text1PositionX_' + cardId).value = element.style.left.replace('px', '');
      document.getElementById('text1PositionY_' + cardId).value = element.style.top.replace('px', '');
      // Optionally, add AJAX call here to update the database
    }
  }

/// Function to adjust font size
function adjustFontSize(cardId, increase = true) {
    // Target the specific element for font size adjustment
    let targetElement = document.getElementById('realNameText_' + cardId);

    // Check if the target element exists
    if (targetElement) {
        let currentSize = parseInt(window.getComputedStyle(targetElement).fontSize);
        if (increase) {
          currentSize += 1; // Increase font size by 1px
        } else {
          currentSize -= 1; // Decrease font size by 1px
        }
        targetElement.style.fontSize = `${currentSize}px`;

        // Update input value
        document.getElementById('font1Size_' + cardId).value = currentSize;
    } else {
        console.error('Element not found: realNameText_' + cardId);
    }
}

// Add event listeners to buttons
document.querySelectorAll('[id^="increaseFont_"]').forEach(button => {
    button.addEventListener('click', function() {
        var cardId = this.id.split('_')[1]; // Extract card ID from button ID
        adjustFontSize(cardId, true);
    });
});

document.querySelectorAll('[id^="decreaseFont_"]').forEach(button => {
    button.addEventListener('click', function() {
        var cardId = this.id.split('_')[1]; // Extract card ID from button ID
        adjustFontSize(cardId, false);
    });
});


//////////////
  // Apply to all realName elements
  document.querySelectorAll('.realName').forEach(dragElement);
  