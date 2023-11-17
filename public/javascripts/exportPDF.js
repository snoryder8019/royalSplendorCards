function exportFrontFrameToPDF() {
    const element = document.querySelector('.cardFrontFrame');
    html2pdf(element, {
      margin: 10,
      filename: 'front_frame.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    });
}

function exportBackFrameToPDF() {
    const element = document.querySelector('.cardBackFrame');
    html2pdf(element, {
      margin: 10,
      filename: 'back_frame.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    });
}