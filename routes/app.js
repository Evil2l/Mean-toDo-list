var express = require('express');
var router = express.Router();

var Task = require('../models/task');
var Comment = require('../models/comment');

router.get('/', function (req, res, next) {
        res.render('index');
});


router.post('/', function(req, res, next) {
    var text = req.body.text;
    var comment = new Comment({
        text: text,
        author: "Lili"
    });
    var task = new Task({
        title: "Finish app",
        description: "Todo app with few options"

    });
    comment.save();
    res.redirect('/' );
});

module.exports = router;
