const User = require("../models/user")
const userRouter = require("express").Router()
const bcrypt = require("bcrypt")

userRouter.get("/", async (request, response) => {
	const users = await User.find({})

	response.json(users).end()
})

userRouter.post("/", async (request, response) => {
	const { username, name, password } = request.body

	if (password.length < 3) {
		return response.status(400).json({ error: "password too short" })
	} else {
		let passwordHash = await bcrypt.hash(password, 10)

		let newUser = new User({
			username,
			name,
			passwordHash,
		})

		await newUser.save(newUser)

		response.status(201).json(newUser)
	}
})

module.exports = userRouter
