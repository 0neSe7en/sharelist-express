/**
 * Created by 0neSe7en on 2015/4/10.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.route('/:id')
  .get(function(){
    res.send("Lists[GET]["+req.params.id+"]");
  })
  .post(function(){
    res.send("Lists[POST]["+req.params.id+"]");
  })
  .delete(function(){
    res.send("Lists[DELETE]["+req.params.id+"]");
  })
  .put(function(){
    res.send("Lists[UPDATE]["+req.params.id+"]");
  });

module.exports = router;
