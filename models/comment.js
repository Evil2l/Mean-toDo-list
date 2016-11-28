var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    text: {type: String, required: true},
    author: {type: String},
    date: {type: Date, default: Date.now},
    task:
    {
        type: Schema.Types.ObjectId,
        ref: "Task"
    }

});


module.exports = mongoose.model("Comment", commentSchema);