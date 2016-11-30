var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require("mongoose-unique-validator");

var taskSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    deadline: {type: Date, default: Date.now},
    isDone: { type: Boolean, default: false},
    comments:[
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]

});
    // title of task got ot be unique
taskSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model("Task", taskSchema);