// loader.js
window.onload = function() {
    // List of other JS files to load
    const scriptsToLoad = [
      '/javascripts/menuControl.js'
      // Add more script files here
    ];
  
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
    Promise.all(scriptsToLoad.map(loadScript))
      .then(() => {
        console.log('All scripts loaded');
        // You can add additional logic here if needed
      })
      .catch((error) => {
        console.error('Error loading scripts:', error);
      });
  };
  