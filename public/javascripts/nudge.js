document.addEventListener("DOMContentLoaded", function () {
    // Function to update the transform of an element
    const updateElementTransform = (element, positionX, positionY) => {
      element.style.transform = `translateX(${positionX}px) translateY(${positionY}px)`;
    };
  
    // Function to handle nudge actions
    const nudge = (elementType, direction, cardId) => {
      let element;
      let positionXKey, positionYKey, fontSizeKey;
  
      if (elementType === 'headshot') {
        element = document.querySelector(`#headshot_${cardId} img`);
        positionXKey = 'imgPositionX';
        positionYKey = 'imgPositionY';
      } else if (elementType === 'textBox') {
        element = document.querySelector(`#textBox_${cardId}`);
        positionXKey = 'text0PositionX';
        positionYKey = 'text0PositionY';
        fontSizeKey = 'font0Size';
      }
  
      if (!element) {
        return; // Exit if the element is not found
      }
  
      let positionX = parseFloat(element.style.transform.match(/translateX\(([^)]+)\)/)[1]);
      let positionY = parseFloat(element.style.transform.match(/translateY\(([^)]+)\)/)[1]);
      let fontSize = parseFloat(getComputedStyle(document.querySelector(`#textTitles_${cardId}`)).fontSize);
  
      switch (direction) {
        case 'up':
          positionY -= 5;
          break;
        case 'down':
          positionY += 5;
          break;
        case 'left':
          positionX -= 5;
          break;
        case 'right':
          positionX += 5;
          break;
        case 'fontSizeUp':
          fontSize += 1;
          break;
        case 'fontSizeDown':
          fontSize -= 1;
          break;
        // Add more cases for other directions as needed
      }
  
      // Update the transform property of the element
      updateElementTransform(element, positionX, positionY);
  
      // Update and save positioning and font size data in hidden input fields
      document.querySelector(`#${positionXKey}_${cardId}`).value = positionX;
      document.querySelector(`#${positionYKey}_${cardId}`).value = positionY;
      if (fontSizeKey) {
        document.querySelector(`#${fontSizeKey}_${cardId}`).value = fontSize;
        document.querySelector(`#textTitles_${cardId}`).style.fontSize = `${fontSize}px`;
      }
    };
  
    // Add event listeners for nudge buttons for headshot
    document.querySelectorAll('.control-arrow').forEach((arrow) => {
      const cardId = arrow.dataset.cardId;
      arrow.querySelector('.imgUpArrow').addEventListener('click', () => nudge('headshot', 'up', cardId));
      arrow.querySelector('.imgDownArrow').addEventListener('click', () => nudge('headshot', 'down', cardId));
      arrow.querySelector('.imgLeftArrow').addEventListener('click', () => nudge('headshot', 'left', cardId));
      arrow.querySelector('.imgRightArrow').addEventListener('click', () => nudge('headshot', 'right', cardId));
    });
  
    // Add event listeners for nudge buttons for textBox
    document.querySelectorAll('.control-arrow').forEach((arrow) => {
      const cardId = arrow.dataset.cardId;
      arrow.querySelector('.textUpArrow').addEventListener('click', () => nudge('textBox', 'up', cardId));
      arrow.querySelector('.textDownArrow').addEventListener('click', () => nudge('textBox', 'down', cardId));
      arrow.querySelector('.textLeftArrow').addEventListener('click', () => nudge('textBox', 'left', cardId));
      arrow.querySelector('.textRightArrow').addEventListener('click', () => nudge('textBox', 'right', cardId));
      arrow.querySelector('.fontUpButton').addEventListener('click', () => nudge('textBox', 'fontSizeUp', cardId));
      arrow.querySelector('.fontDownButton').addEventListener('click', () => nudge('textBox', 'fontSizeDown', cardId));
    });
  });
  