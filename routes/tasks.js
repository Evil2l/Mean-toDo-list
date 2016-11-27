var express = require('express');
var router = express.Router();

var Task = require('../models/task');

router.get('/',  function(req, res, next){
    Task.find()
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
    var task = new Task({
        deadline: req.body.deadline,
        description: req.body.description,
        title: req.body.title
    });
    task.save(function(err, result){
        if(err){
            return res.status(500).json({
                tittle: "An error,",
                error: err
            });
        }
        res.status(201).json({
            message: "task saved",
            obj: result
        })

    });
});

module.exports = router;