var express = require('express');
var router = express.Router();

var Comment = require('../models/task');

router.get('/',  function(req, res, next){
    Comment.find()
        .exec(function(err, result){
            if(err){
                return res.status(500).json({
                    tittle: "An error,",
                    error: err
                });
            }
            res.status(201).json({
                message: "task saved",
                obj: result
            });
        });
});

router.post('/', function (req, res, next) {
    var comment = new Comment({
        text: text,
        author: "Lili"
    });
    comment.save(function(err, result){
        if(err){
            return res.status(500).json({
                tittle: "An error,",
                error: err
            });
        }
        res.status(201).json({
            message: "task saved",
            obj: result
        });
    });
});

module.exports = router;