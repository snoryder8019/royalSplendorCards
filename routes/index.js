var express = require('express');
var router = express.Router();
const pluginsRouter = require('../plugins')
router.use(pluginsRouter)
const flash = require('express-flash');


/* GET home page. */
router.get('/', (req, res) => {
  let user = req.user;

    res.render('index', { user: user, message: req.flash('message') });

});



module.exports = router;
