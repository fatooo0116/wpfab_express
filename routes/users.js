var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('userxdoor/index', { title: 'Admin Login' });
});
router.get('/admin', function(req, res, next) {
  res.render('userxdoor/admin', { title: 'Admin' });
});
module.exports = router;
