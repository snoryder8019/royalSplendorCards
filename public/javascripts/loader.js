// loader.js
// Function to dynamically load a script
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
};

// Load all scripts
const scriptsToLoad = [
  '/javascripts/menuControl.js',
  '/javascripts/buttonControl.js',
  '/javascripts/nudge.js' 
  // Add more script files here
];

Promise.all(scriptsToLoad.map(loadScript))
  .then(() => {
    console.log('All scripts loaded');
    if (typeof logPos === 'function') {
      logPos();  // Call your function here
    }
  })
  .catch((error) => {
    console.error('Error loading scripts:', error);
  });
