function logPos() {
    const cardFrontPreview = document.getElementById('cardFrontPreview');
    const sampleFace = document.getElementById('sampleFace');
    
    if (cardFrontPreview) {


      console.log('Card Front - Width:', cardFrontPreview.width, 'Height:', cardFrontPreview.height);
      const rectFront = cardFrontPreview.getBoundingClientRect();
      console.log('Card Front - Top:', rectFront.top, 'Left:', rectFront.left);
    }
  


 
  // Add event listeners for buttons
  document.getElementById('moveUp').addEventListener('click', function() {
    moveSampleFace(0, -10);
  });
  document.getElementById('moveDown').addEventListener('click', function() {
    moveSampleFace(0, 10);
  });
  document.getElementById('moveLeft').addEventListener('click', function() {
    moveSampleFace(-10, 0);
  });
  document.getElementById('moveRight').addEventListener('click', function() {
    moveSampleFace(10, 0);
  });
}

function moveSampleFace(dx, dy) {
  const sampleFace = document.getElementById('sampleFace');
  const rect = sampleFace.getBoundingClientRect();
  const left = rect.left + dx;
  const top = rect.top + dy;
  sampleFace.style.left = left + 'px';
  sampleFace.style.top = top + 'px';
  
  // Update live position in the input field
  const livePosInput = document.getElementById('livePos');
  livePosInput.value = `Left: ${left}, Top: ${top}`;
}
  // Initialize
  window.onload = function() {
    logPos();
    const sampleFace = document.getElementById('sampleFace');
    sampleFace.style.maxWidth = '100%';
    sampleFace.style.position = 'absolute';

   // sampleFace.style.zIndex = '-1';
  };
  