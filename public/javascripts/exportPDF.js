function exportFrontFrameToPDF(userName) {
    const element = document.querySelector('.cardFrontFrame');
    const canvasWidth = element.offsetWidth;
    const canvasHeight = element.offsetHeight;

    html2pdf().from(element).set({
      margin: [0, 0, 0, 0],
      filename: `card_front_${userName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3, width: canvasWidth, height: canvasHeight },
      jsPDF: { unit: 'mm', format: [canvasWidth, canvasHeight] }
    }).save();
}

function exportBackFrameToPDF(userName) {
    const element = document.querySelector('.cardBackFrame');
    const canvasWidth = element.offsetWidth;
    const canvasHeight = element.offsetHeight;

    html2pdf().from(element).set({
      margin: [0, 0, 0, 0],
      filename: `card_back_${userName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 3, width: canvasWidth, height: canvasHeight },
      jsPDF: { unit: 'mm', format: [canvasWidth, canvasHeight] }
    }).save();
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
  html2pdf().from(dataDiv).set({
      margin: [10, 10, 10, 10],
      filename: `user_card_order_data_${user.lastName}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4' }
  }).save().then(() => {
      // Remove the element after saving
      document.body.removeChild(dataDiv);
  });
}

// HTML Button
