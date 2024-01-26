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

function exportHighResolutionImage(selector, fileName) {
  const element = document.querySelector(selector);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const scaleFactor = 300 / 96; // Convert screen resolution (96 DPI) to 300 DPI
  canvas.width = 1125 * scaleFactor;
  canvas.height = 675 * scaleFactor;
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

function exportFrontFrameToPDF(userName) {
  const element = document.querySelector('.cardFrontFrame');
  const canvasWidth = 1125; // Width in pixels
  const canvasHeight = 675; // Height in pixels
exportHighResolutionImage('.cardFrontFrame',`card_front_${userName}.png`)
  html2pdf()
    .from(element)
    .set({
      margin: [0, 0, 0, 0],
      filename: `card_front_${userName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1, width: canvasWidth, height: canvasHeight },
      jsPDF: { unit: 'px', format: [canvasWidth, canvasHeight] }
    })
    .save();
}

function exportBackFrameToPDF(userName) {
  const element = document.querySelector('.cardBackFrame');
  const canvasWidth = 1125; // Width in pixels
  const canvasHeight = 675; // Height in pixels

  html2pdf()
    .from(element)
    .set({
      margin: [0, 0, 0, 0],
      filename: `card_back_${userName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 1, width: canvasWidth, height: canvasHeight },
      jsPDF: { unit: 'px', format: [canvasWidth, canvasHeight] }
    })
    .save();
}

function exportUserDataToPDF(user, card, order) {
  // Create an HTML representation of your data
  const dataDiv = document.createElement('div');
  dataDiv.className = 'userDataPDF';
  dataDiv.innerHTML = `
      <h3>User Data</h3><p>${JSON.stringify(user, null, 2)}</p>
      <h3>Card Data</h3><p>${JSON.stringify(card, null, 2)}</p>
      <h3>Order Data</h3><p>${JSON.stringify(order, null, 2)}</p>`;

  // Optionally add the div to the document body
  document.body.appendChild(dataDiv);

  // Export to PDF
  html2pdf()
    .from(dataDiv)
    .set({
      margin: [10, 10, 10, 10],
      filename: `user_card_order_data_${user.lastName}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'px', format: [1125, 675] } // Width and height in pixels
    })
    .save()
    .then(() => {
      // Remove the element after saving
      document.body.removeChild(dataDiv);
    });
}

// HTML Button
