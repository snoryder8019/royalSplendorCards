function convertJPGtoPNG(jpgSrc) {
  const img = new Image();
  img.src = jpgSrc;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const pngSrc = canvas.toDataURL('image/png');
    // Use pngSrc for further processing or download
    download(pngSrc, 'converted_image.png');
  };
}

function exportHighResolutionImage(selector, fileName, orientation) {
  let canvasWidth;
  let canvasHeight;
  const screenResolution = window.devicePixelRatio || 1; // Get screen resolution

  if (orientation == "horizontal") {
    canvasWidth = 1125; // Width in pixels
    canvasHeight = 675; // Height in pixels
  } else if (orientation == "vertical") {
    canvasHeight = 1125; // Width in pixels
    canvasWidth = 675; // Height in pixels
  } else {
    console.error("Invalid orientation. Please specify 'horizontal' or 'vertical'.");
    return;
  }

  const element = document.querySelector(selector);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const scaleFactor = screenResolution; // No need to adjust the scale factor for PNGs
  canvas.width = canvasWidth * scaleFactor;
  canvas.height = canvasHeight * scaleFactor;
  ctx.scale(scaleFactor, scaleFactor);

  html2canvas(element, { canvas: canvas }).then(canvas => {
    download(canvas.toDataURL('image/png'), fileName);
  });
}

function download(dataUrl, fileName) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function exportFrontFrameToPDF(userName, orientation) {
  const element = document.querySelector('.cardFrontFrameExport');
  let canvasWidth;
  let canvasHeight;
  const screenResolution = window.devicePixelRatio || 1; // Get screen resolution

  if (orientation == "horizontal") {
    canvasWidth = 1125; // Width in pixels
    canvasHeight = 675; // Height in pixels
  } else if (orientation == "vertical") {
    canvasWidth = 675; // Width in pixels
    canvasHeight = 1125; // Height in pixels
  } else {
    console.error("Invalid orientation. Please specify 'horizontal' or 'vertical'.");
    return;
  }

 // exportHighResolutionImage('.cardFrontFrame', `card_front_${userName}.png`, orientation);

  html2pdf()
    .from(element)
    .set({
      margin: [0, 0, 0, 0],
      filename: `card_front_${userName}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: screenResolution, width: canvasWidth, height: canvasHeight },
      jsPDF: { unit: 'px', format: [canvasWidth, canvasHeight] }
    })
    .save();
}

function exportBackFrameToPDF(userName, orientation) {
  const element = document.querySelector('.cardBackFrameExport');
  let canvasWidth;
  let canvasHeight;
  const screenResolution = window.devicePixelRatio || 1; // Get screen resolution

  if (orientation == "horizontal") {
    canvasWidth = 1125; // Width in pixels
    canvasHeight = 675; // Height in pixels
  } else if (orientation == "vertical") {
    canvasWidth = 675; // Width in pixels
    canvasHeight = 1125; // Height in pixels
  } else {
    console.error("Invalid orientation. Please specify 'horizontal' or 'vertical'.");
    return;
  }

 // exportHighResolutionImage('.cardBackFrame', `card_back_${userName}.png`, orientation);

  html2pdf()
    .from(element)
    .set({
      margin: [0, 0, 0, 0],
      filename: `card_back_${userName}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: screenResolution, width: canvasWidth, height: canvasHeight },
      jsPDF: { unit: 'px', format: [canvasWidth, canvasHeight] }
    })
    .save();
}

function exportUserDataToPDF(userName) {
  const element = document.querySelector('.orderInfo');
  const canvasWidth = 1125; // Width in pixels
  const canvasHeight = 675; // Height in pixels
  const screenResolution = window.devicePixelRatio || 1; // Get screen resolution

  html2pdf()
    .from(element)
    .set({
      margin: [0, 0, 0, 0],
      filename: `order_data_${userName}.pdf`,
      //image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: screenResolution, width: canvasWidth, height: canvasHeight },
      jsPDF: { unit: 'px', format: [canvasWidth, canvasHeight] }
    })
    .save();
}
