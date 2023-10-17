// nudge.js
const imgPosition = { top: 0, left: 0 };
const headshot = document.querySelector('.headshot');
let scaleFactor = 1; // Initial scale factor
const scaleIncrement = 0.1; // Adjust the scale increment as needed
const positionIncrement = 3; // Adjust the position increment as needed

function updatePosition() {
  headshot.style.bottom = imgPosition.top + 'px';
  headshot.style.left = imgPosition.left + 'px';
}

// Function to scale up
function scaleUp() {
  scaleFactor += scaleIncrement; // Increment the scale factor
  headshot.style.transform = `scale(${scaleFactor})`;
  logHiddenInput();
}

// Function to scale down
function scaleDown() {
  scaleFactor -= scaleIncrement; // Decrement the scale factor
  if (scaleFactor < 1) {
    scaleFactor = 1; // Ensure minimum scale is 1
  }
  headshot.style.transform = `scale(${scaleFactor})`;
  logHiddenInput();
}

// Function to log the hidden input value
function logHiddenInput() {
  const hiddenInput = document.getElementById('hiddenInput').value;
  if (hiddenInput) {
    try {
      const parsedData = JSON.parse(hiddenInput);
      console.log(parsedData); // Log the parsed data as an object
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  } else {
    console.log('Hidden input value is empty');
  }
}
document.getElementById('upArrow').addEventListener('click', function () {
  imgPosition.top -= positionIncrement; // Move up
  updatePosition();
  logHiddenInput();
});

document.getElementById('downArrow').addEventListener('click', function () {
  imgPosition.top += positionIncrement; // Move down
  updatePosition();
  logHiddenInput();
});

document.getElementById('leftArrow').addEventListener('click', function () {
  imgPosition.left -= positionIncrement; // Move left
  updatePosition();
  logHiddenInput();
});

document.getElementById('rightArrow').addEventListener('click', function () {
  imgPosition.left += positionIncrement; // Move right
  updatePosition();
  logHiddenInput();
});

// You can also add scaling buttons and functionality
document.getElementById('scaleUpButton').addEventListener('click', scaleUp);
document.getElementById('scaleDownButton').addEventListener('click', scaleDown);

// Initial log when the page loads
logHiddenInput();
