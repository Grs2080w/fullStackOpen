const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
	url: {
		type: String,
		required: true,
	},

	author: {
		type: String,
		required: true,
	},

	title: {
		type: String,
		required: true,
	},

	user: {
		username: {
			type: String,
		},
		id: {
			type: String,
		},
		name: String,
	},

	likes: {
		type: Number,
		required: true,
	},

	comments: {
		type: Array,
	},
})

blogSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog
