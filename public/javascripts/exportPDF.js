function exportFrontFrameToPDF(userName, orientation) {
    const element = document.querySelector('.cardFrontFrame');
    html2pdf(element, {
      margin: 10,
      filename: `card_back_${userName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: `${orientation}` }
    });
}

function exportBackFrameToPDF(userName, orientation) {
    const element = document.querySelector('.cardBackFrame');
    html2pdf(element, {
      margin: 10,
      filename: `card_back_${userName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: `${orientation}` }
    });
}