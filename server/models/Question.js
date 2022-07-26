const { Schema, model } = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

let questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
				required: true
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "categories"
    }
}, {
    timestamps: true
})


questionSchema.virtual('fromAdmins', {
	ref: 'admins',
	localField: 'author',
	foreignField: '_id', 
	justOne: true
});

questionSchema.virtual('fromUsers', {
	ref: 'users',
	localField: 'author',
	foreignField: '_id',
	justOne: true
});

questionSchema.plugin(mongoosePaginate)
const Question = model("Question", questionSchema);
module.exports = Question;