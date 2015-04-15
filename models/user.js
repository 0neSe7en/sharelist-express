var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var Schema = mongoose.Schema;
var tokenUtils = require('../utils');

var UserSchema = new Schema({
  name: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

UserSchema.index({name: 1, email: 1, password: -1});


UserSchema.pre('save', function(next){
  var user = this;
  if (this.isModified('password') || this.isNew){
    user.password = getHashPwd(user.password);
    next();
  }
  else {
    return next();
  }
});


UserSchema.statics.getToken = function(name, pwd, cb){
  this.findOne( name.indexOf('@') == -1 ? {name: name} : {email: name},
    function(err, user){
      if (err || !user){
        cb(err);
      }
      else if (user.password === getHashPwd(pwd)){
        cb(err, {
          token: jwt.sign({id: user._id}, tokenUtils.getKey(), {expiresInMinutes: 60*5}),
          id: user._id
        });
      } else {
        cb({err: "Password Invaild"});
      }
    }
  )
};

function getHashPwd(pwd){
  var md5 = crypto.createHash('md5');
  return md5.update(pwd).digest('base64');
}

module.exports = mongoose.model('User', UserSchema);