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

router.delete('/:id', function(req, res, next) {
    Task.findById(req.params.id, function (err, task) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!task) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Message not found'}
            });
        }
        task.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
        });
    });
});

module.exports = router;