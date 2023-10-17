const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest = './public/cards/';
    if (file.fieldname.startsWith('fonts')) {
      dest = './public/fonts/';
    }
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    // No need to check for file existence, it will overwrite if exists
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB
}).fields([
  { name: 'cardFront', maxCount: 1 },
  { name: 'cardBack', maxCount: 1 },
  { name: 'fontName1', maxCount: 1 },
  { name: 'fontName2', maxCount: 1 },
  { name: 'fonts', maxCount: 10 }  // Allow up to 10 font files
]);
module.exports = upload;
