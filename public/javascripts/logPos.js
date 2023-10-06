function logPos() {
    if (cardFrontPreview) {
      console.log('Card Front - Width:', cardFrontPreview.width, 'Height:', cardFrontPreview.height);
    }
    if (cardBackPreview) {
      console.log('Card Back - Width:', cardBackPreview.width, 'Height:', cardBackPreview.height);
    }
  }
  
  window.onload = function() {
    const cardFrontPreview = document.getElementById('cardFrontPreview');
    const cardBackPreview = document.getElementById('cardBackPreview');
    logPos();
  };
  