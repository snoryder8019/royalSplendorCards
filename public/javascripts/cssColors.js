function getColorsFromDOM() {
    const colorInfoList = [];
  
    const allElements = document.getElementsByTagName('*'); // Get all elements in the DOM
  
    Array.from(allElements).forEach((element) => {
      const style = getComputedStyle(element);
      const elementInfo = {
        id: element.id,
        classNames: element.className,
        color: style.color,
        backgroundColor: style.backgroundColor
      };
      // Only add if the color or backgroundColor is set
      if (elementInfo.color || elementInfo.backgroundColor) {
        colorInfoList.push(elementInfo);
      }
    });
  
    return colorInfoList; // Return the list of color information
  }
  
  function appendColorsToHtml() {
    const colors = getColorsFromDOM();
    const colorsContainer = document.createElement('div');
    colorsContainer.className = 'colorsContainer'; // Add class for styling if needed
  
    colors.forEach(info => {
      const colorElement = document.createElement('div');
      colorElement.textContent = `Color: ${info.color}, Background: ${info.backgroundColor}, ID: ${info.id || 'none'}, Class: ${info.classNames || 'none'}`;
      colorElement.style.color = info.color;
      colorElement.style.backgroundColor = info.backgroundColor;
      colorsContainer.appendChild(colorElement);
    });
  
    document.body.appendChild(colorsContainer);
  }
  
  // Execute the function to append the colors to the HTML
  //appendColorsToHtml();
  