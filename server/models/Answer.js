const { Schema, model } = require("mongoose")

let answerSchema = new Schema({
    question: {
        type: Schema.Types.ObjectId,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    audio: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}, {
    timestamps: true
})

const Answer = model("Answer", answerSchema);
module.exports = Answer;