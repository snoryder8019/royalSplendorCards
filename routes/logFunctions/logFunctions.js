var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

function lib(msg, err, data, filename) {
  // Define the log file path
  const logPath = path.join(__dirname, `../../logs/${filename}`);
  
  let logMessage = '';

  // Add date stamp
  logMessage += `Date: ${new Date().toISOString()}\n`;

  if (msg) {
    logMessage += `Message: ${msg}\n`;
  }

  if (err) {
    logMessage += `Error: ${err}\n`;
  }

  if (data) {
    logMessage += `Data: ${JSON.stringify(data)}\n`;
  }

  logMessage += '---\n';

  // Append the log message to the file
  fs.appendFile(logPath, logMessage, (writeErr) => {
    if (writeErr) {
      console.error(`Failed to write to log: ${writeErr}`);
    }
  });
}

module.exports = lib;
