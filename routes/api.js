var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// mongoose.connect("mongodb://user:user@ds163417.mlab.com:63417/mean-todo", function(err) {
//     if (err) throw err;
// });
var db = mongoose.connection;


router.get('/', function(req, res, next){
    console.log(db);
});

module.exports = router;