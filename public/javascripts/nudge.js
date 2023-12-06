document.addEventListener("DOMContentLoaded", function () {
  const updateElementTransform = (element, positionX, positionY, scale) => {
    element.style.transform = `translateX(${positionX}px) translateY(${positionY}px) scale(${scale})`;
  };

  const nudgeImage = (cardId, direction) => {
    const element = document.querySelector(`#headshot_${cardId} img`);
    const positionXKey = 'imgPositionX';
    const positionYKey = 'imgPositionY';
    const scaleKey = 'imgScale';

    if (!element) return;

    const transformValue = element.style.transform || 'translateX(0px) translateY(0px) scale(1)';
    const positionXMatch = transformValue.match(/translateX\(([^)]+)\)/);
    const positionYMatch = transformValue.match(/translateY\(([^)]+)\)/);
    const scaleMatch = transformValue.match(/scale\(([^)]+)\)/);

    let positionX = positionXMatch ? parseFloat(positionXMatch[1]) : 0;
    let positionY = positionYMatch ? parseFloat(positionYMatch[1]) : 0;
    let imgScale = scaleMatch ? parseFloat(scaleMatch[1]) : 1;
console.log(positionX)
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
      case 'scaleUp':
        imgScale += 0.1;
        break;
      case 'scaleDown':
        imgScale -= 0.1;
        break;
    }

    updateElementTransform(element, positionX, positionY, imgScale);

    document.querySelector(`#${positionXKey}_${cardId}`).value = positionX;
    document.querySelector(`#${positionYKey}_${cardId}`).value = positionY;
    document.querySelector(`#${scaleKey}_${cardId}`).value = imgScale;
  };

  const nudge = (elementType, direction, cardId) => {
    let element, positionXKey, positionYKey, fontSizeKey, scaleKey;

    if (elementType === 'headshot') {
      element = document.querySelector(`#headshot_${cardId} img`);
      positionXKey = 'imgPositionX';
      positionYKey = 'imgPositionY';
      scaleKey = 'imgScale';
    } else if (elementType === 'textBox') {
      element = document.querySelector(`#textBox_${cardId}`);
      positionXKey = 'text0PositionX';
      positionYKey = 'text0PositionY';
      fontSizeKey = 'font0Size';
    }

    if (!element) return;

    const transformValue = element.style.transform || 'translateX(0px) translateY(0px) scale(1)';
    const positionXMatch = transformValue.match(/translateX\(([^)]+)\)/);
    const positionYMatch = transformValue.match(/translateY\(([^)]+)\)/);
    const scaleMatch = transformValue.match(/scale\(([^)]+)\)/);

    let positionX = positionXMatch ? parseFloat(positionXMatch[1]) : 0;
    let positionY = positionYMatch ? parseFloat(positionYMatch[1]) : 0;
    let fontSize = parseFloat(getComputedStyle(document.querySelector(`#textTitles_${cardId}`)).fontSize);
    let imgScale = scaleMatch ? parseFloat(scaleMatch[1]) : 1;

    switch (direction) {
      case 'up': positionY -= 5; break;
      case 'down': positionY += 5; break;
      case 'left': positionX -= 5; break;
      case 'right': positionX += 5; break;
      case 'fontSizeUp': fontSize += 1; break;
      case 'fontSizeDown': fontSize -= 1; break;
      case 'scaleUp': imgScale += 0.1; break;
      case 'scaleDown': imgScale -= 0.1; break;
    }

    updateElementTransform(element, positionX, positionY, imgScale);

    document.querySelector(`#${positionXKey}_${cardId}`).value = positionX;
    document.querySelector(`#${positionYKey}_${cardId}`).value = positionY;
    if (fontSizeKey) {
      document.querySelector(`#${fontSizeKey}_${cardId}`).value = fontSize;
      document.querySelector(`#textTitles_${cardId}`).style.fontSize = `${fontSize}px`;
    }
    document.querySelector(`#${scaleKey}_${cardId}`).value = imgScale;
  };

  document.querySelectorAll('.imgControlArrows').forEach((arrow) => {
    const cardId = arrow.dataset.cardId;
    arrow.querySelector('.imgUpArrow').addEventListener('click', () => nudgeImage(cardId, 'up'));
    arrow.querySelector('.imgDownArrow').addEventListener('click', () => nudgeImage(cardId, 'down'));
    arrow.querySelector('.imgLeftArrow').addEventListener('click', () => nudgeImage(cardId, 'left'));
    arrow.querySelector('.imgRightArrow').addEventListener('click', () => nudgeImage(cardId, 'right'));
    arrow.querySelector('.imgScaleUpButton').addEventListener('click', () => nudgeImage(cardId, 'scaleUp'));
    arrow.querySelector('.imgScaleDownButton').addEventListener('click', () => nudgeImage(cardId, 'scaleDown'));
  });

  document.querySelectorAll('.textControlArrows').forEach((arrow) => {
    const cardId = arrow.dataset.cardId;
    arrow.querySelector('.textUpArrow').addEventListener('click', () => nudge('textBox', 'up', cardId));
    arrow.querySelector('.textDownArrow').addEventListener('click', () => nudge('textBox', 'down', cardId));
    arrow.querySelector('.textLeftArrow').addEventListener('click', () => nudge('textBox', 'left', cardId));
    arrow.querySelector('.textRightArrow').addEventListener('click', () => nudge('textBox', 'right', cardId));
    arrow.querySelector('.fontUpButton').addEventListener('click', () => nudge('textBox', 'fontSizeUp', cardId));
    arrow.querySelector('.fontDownButton').addEventListener('click', () => nudge('textBox', 'fontSizeDown', cardId));
  });

});
