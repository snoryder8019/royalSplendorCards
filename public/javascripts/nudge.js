document.addEventListener("DOMContentLoaded", function () {
    // Function to update the headshot's transform
    const updateHeadshotTransform = (headshot, translateX, translateY, scale) => {
      headshot.style.transform = `translate(${translateX}%, ${translateY}%) scale(${scale})`;
    };
  
    // Function to handle nudge actions
    const nudge = (direction, cardId) => {
      const headshot = document.querySelector(`#headshot_${cardId} img`);
      let translateX = parseFloat(headshot.dataset.translateX || 0);
      let translateY = parseFloat(headshot.dataset.translateY || 0);
      let scale = parseFloat(headshot.dataset.scale || 1);
  
      switch (direction) {
        case 'up':
          translateY -= 5;
          break;
        case 'down':
          translateY += 5;
          break;
        case 'left':
          translateX -= 5;
          break;
        case 'right':
          translateX += 5;
          break;
        case 'scaleUp':
          scale += 0.1;
          break;
        case 'scaleDown':
          scale -= 0.1;
          break;
        case 'fontUp':
          // Increase font size (adjust the value as needed)
          headshot.dataset.font0Size = parseFloat(headshot.dataset.font0Size || 0) + 1;
          break;
        case 'fontDown':
          // Decrease font size (adjust the value as needed)
          headshot.dataset.font0Size = parseFloat(headshot.dataset.font0Size || 0) - 1;
          break;
        case 'textLeft':
          // Move text left (adjust the value as needed)
          headshot.dataset.text0PositionX = parseFloat(headshot.dataset.text0PositionX || 0) - 5;
          break;
        case 'textRight':
          // Move text right (adjust the value as needed)
          headshot.dataset.text0PositionX = parseFloat(headshot.dataset.text0PositionX || 0) + 5;
          break;
        case 'textUp':
          // Move text up (adjust the value as needed)
          headshot.dataset.text0PositionY = parseFloat(headshot.dataset.text0PositionY || 0) - 5;
          break;
        case 'textDown':
          // Move text down (adjust the value as needed)
          headshot.dataset.text0PositionY = parseFloat(headshot.dataset.text0PositionY || 0) + 5;
          break;
      }
  
      // Update and save positioning, scale, font0Size, text0PositionX, and text0PositionY data in hidden input fields
      document.querySelector(`#positionX_${cardId}`).value = translateX;
      document.querySelector(`#positionY_${cardId}`).value = translateY;
      document.querySelector(`#scale_${cardId}`).value = scale;
      document.querySelector(`#font0Size_${cardId}`).value = headshot.dataset.font0Size || 0;
      document.querySelector(`#text0PositionX_${cardId}`).value = headshot.dataset.text0PositionX || 0;
      document.querySelector(`#text0PositionY_${cardId}`).value = headshot.dataset.text0PositionY || 0;
  
      // Update the dataset attributes for the headshot element
      headshot.dataset.translateX = translateX;
      headshot.dataset.translateY = translateY;
      headshot.dataset.scale = scale;
  
      // Update the headshot's transform
      updateHeadshotTransform(headshot, translateX, translateY, scale);
    };
  
    // Add event listeners for the nudge buttons within the loop
    document.querySelectorAll('.control-arrow').forEach((arrow) => {
      const cardId = arrow.dataset.cardId;
      arrow.querySelector('.imgUpArrow').addEventListener('click', () => nudge('up', cardId));
      arrow.querySelector('.imgDownArrow').addEventListener('click', () => nudge('down', cardId));
      arrow.querySelector('.imgLeftArrow').addEventListener('click', () => nudge('left', cardId));
      arrow.querySelector('.imgRightArrow').addEventListener('click', () => nudge('right', cardId));
      arrow.querySelector('.imgScaleUpButton').addEventListener('click', () => nudge('scaleUp', cardId));
      arrow.querySelector('.imgScaleDownButton').addEventListener('click', () => nudge('scaleDown', cardId));
      arrow.querySelector('.fontUpButton').addEventListener('click', () => nudge('fontUp', cardId));
      arrow.querySelector('.fontDownButton').addEventListener('click', () => nudge('fontDown', cardId));
      arrow.querySelector('.textLeftArrow').addEventListener('click', () => nudge('textLeft', cardId));
      arrow.querySelector('.textRightArrow').addEventListener('click', () => nudge('textRight', cardId));
      arrow.querySelector('.textUpArrow').addEventListener('click', () => nudge('textUp', cardId));
      arrow.querySelector('.textDownArrow').addEventListener('click', () => nudge('textDown', cardId));
    });
  });
  