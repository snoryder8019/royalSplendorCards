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
