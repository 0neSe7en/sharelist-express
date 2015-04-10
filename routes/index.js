var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'});
});

router.route('/login')
  .get(function (req, res) {
    res.send("login[GET]");
  })
  .post(function (req, res) {
    res.send("login[POST]");
  });

router.route('/logout')
  .get(function (req, res) {
    res.send("logout[GET]");
  })
  .post(function (req, res) {
    res.send("logout[POST]");
  });


module.exports = router;
