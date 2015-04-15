var jwt = require('jsonwebtoken');

var secretKey = 'it is a secret key';

exports.getKey = function(){
  return secretKey;
};

exports.tokenVerify = function(req, res, next){
  var token = req.header("x-access-token");
  if (!token){
    res.status(401).json({"message": "No Token"});
  }
  else {
    jwt.verify(token, secretKey, function(err, decoded){
      if (err){
        res.status(401).json(err);
      }
      else{
        next()
      }
    });
  }
};