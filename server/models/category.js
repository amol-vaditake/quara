const mongoose = require('mongoose');

const categoryschema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
		image: {
			type: String,
			required: true
	  },
    date: {
        type: Date,
        default: Date.now()
    },
})

const CategoryModel = mongoose.model('categories', categoryschema);

module.exports = {
    CategoryModel
}