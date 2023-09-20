var express = require('express');
var router = express.Router();
const pluginsRouter = require('../plugins')
router.use(pluginsRouter)
//nodemon
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',session:req.session});
});

module.exports = router;
