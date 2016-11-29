var express = require('express');
var router = express.Router();

var Comment = require('../models/comment');
var Task =require('../models/task');

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
                message: "comment saved",
                obj: result
            });
        });
});

router.post('/', function (req, res, next) {
    var id = req.body.taskId;
    console.log(id);
    Task.findById(id, function(err, task){
        if(err){
            return res.status(500).json({
                title: "An error,",
                error: err
            });
        }
        var comment = new Comment({
            text: req.body.text,
            author: req.body.author,
            date: req.body.date,
            taskId: req.body.taskId,
            task: task
        });
        comment.save(function(err, result){
            if(err){
                return res.status(500).json({
                    title: "An error,",
                    error: err
                });
            }
            task.comments.push(result);
            task.save();
            res.status(201).json({
                message: "comment saved",
                obj: result
            });
        });
    });

});
module.exports = router;