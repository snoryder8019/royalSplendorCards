var express = require('express');
var router = express.Router();
const pluginsRouter = require('../plugins')
router.use(pluginsRouter);
const flash = require('express-flash');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const upload = require('../plugins/multer/setup')
function isAdmin(req, res, next) {
    let user = req.user;
    console.log('accessing admin routes: '+user.displayName);

    // Assuming the user object has an 'isAdmin' field that's boolean.
    if (user && user.isAdmin) {
        next(); // User is an admin, proceed to the next middleware or route handler.
    } else {
        req.flash('message', 'Unauthorized. Please log in as an admin.');
        res.redirect('/'); // Not an admin, redirect to the index page.
    }
}
// GET route
router.get('/', isAdmin, (req, res) => {
  let user = req.user;
  res.render('admin', { 
      user: user, 
      message: req.flash('message'), 
      cardFront: req.query.front, 
      cardBack: req.query.back 
  });
});
function clearUploadsDirectory() {
    const directory = path.join(__dirname, '../public/uploads');

    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
    });
}
// POST route
router.post('/uploadCard', isAdmin, upload, (req, res) => {


  if (!req.files.cardFront || !req.files.cardBack) {
      req.flash('message', 'Both front and back files are required.');
      res.redirect('/admin');
      return;
  }
  let cardFrontPath = req.files.cardFront[0].path.replace('public\\', '');
  console.log(cardFrontPath)
  let cardBackPath = req.files.cardBack[0].path.replace('public\\', '');
  console.log(cardBackPath)
  let facePreview = '/images/sampleFace.jpg';

  const dataToStore = {
      cardFront: cardFrontPath,
      cardBack: cardBackPath,
      facePreview : facePreview,
     
    };
    
    fs.writeFile('cardData.json', JSON.stringify(dataToStore), err => {
      //remove all images in upload folder before upload
      if (err) throw err;
      res.redirect('/admin?front=' + cardFrontPath + '&back=' + cardBackPath + '&facePreview='+ facePreview);
  });
});



module.exports = router;
