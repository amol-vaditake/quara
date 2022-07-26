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
        required: true
    }
}, {
    timestamps: true
})

answerSchema.virtual('fromAdmins', {
	ref: 'admins',
	localField: 'author',
	foreignField: '_id', 
	justOne: true
});

answerSchema.virtual('fromUsers', {
	ref: 'users',
	localField: 'author',
	foreignField: '_id',
	justOne: true
});

const Answer = model("Answer", answerSchema);
module.exports = Answer;