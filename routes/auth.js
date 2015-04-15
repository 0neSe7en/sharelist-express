/**
 * Created by 0neSe7en on 2015/4/11.
 */
var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.post('/login', function(req, res){
  var username = req.body.name;
  var password = req.body.password;

  User.getToken(username, password, function(err, message){
    if (err||!message){
      res.status(403).json(err);
    }
    else if (message){
      res.send(message);
    }
  })
});

router.get('/logout', function(req, res){
  res.send("Nothing happened");
});

module.exports = router;
