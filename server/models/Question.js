const { Schema, model } = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

let questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
},
    {
        timestamps: true
    })

questionSchema.plugin(mongoosePaginate)
const Question = model("Question", questionSchema);
module.exports = Question;