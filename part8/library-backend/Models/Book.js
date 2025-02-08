const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		min: 3,
	},
	author: {
		type: Object,
		required: true,
		min: 3,
	},
	published: {
		type: Number,
		required: true,
	},
	genres: {
		type: Array,
		required: true,
	},
})

const Book = mongoose.model("Book", bookSchema)

// Book.deleteMany({}).then(() => {
// 	console.log("Books deleted");
// })


module.exports = Book
