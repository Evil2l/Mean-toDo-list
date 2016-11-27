var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    text: {type: String, required: true},
    author: {type: String},
    task:[
    {
        type: Schema.Types.ObjectId,
        ref: "Task"
    }
],
    date: {type: Date, default: Date.now}
});


module.exports = mongoose.model("Comment", commentSchema);