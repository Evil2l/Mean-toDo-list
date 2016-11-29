var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    author: {type: String, required: true},
    text: {type: String, required: true},
    date: {type: Date, default: Date.now},
    taskId:  {type: String},
    task:{

        type: Schema.Types.ObjectId,
        ref: "Task"

    }

});


module.exports = mongoose.model("Comment", commentSchema);