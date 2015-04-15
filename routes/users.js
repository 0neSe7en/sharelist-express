var express = require('express');
var router = express.Router();
var User = require('../models/user');
var tokenVerify = require('../utils').tokenVerify;

router.use(function(req, res, next){
  console.log("Someone called /users API");
  next();
});

router.post('/', function(req, res){
  var user = new User(
    {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
  );
  user.save(function(err, user){
    if (err){
      res.status(403).send(err);
    }
    else {
      res.json({user: user._id});
    }
  });
});

router.route('/:id')
  .get(function(req, res){
    User.findOne({_id: req.params.id}, {"password": 0}, function(err, user_profile){
      if (user_profile){
        res.json(user_profile);
      }
      else {
        res.status(404).end();
      }
    });
  })
  .post(tokenVerify, function(req, res){
    console.log(req.body);
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, update){
      if (err){
        res.status(403).json(err);
      }
      else {
        res.json(update);
      }
    });
  })
  .delete(tokenVerify, function(req, res){

  });

module.exports = router;
