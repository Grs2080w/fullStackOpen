const mongoose = require("mongoose")


const authorSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	born: {
		type: Number,
	}
})

authorSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		returnedObject.born = returnedObject.born
		delete returnedObject._id
		delete returnedObject.__v
	},
})

const Author = mongoose.model("Author", authorSchema)

module.exports = Author
