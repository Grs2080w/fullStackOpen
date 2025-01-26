const express = require("express")
const app = express()
require("express-async-errors")
const cors = require("cors")
const config = require("./utils/config")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")
const mongoose = require("mongoose")

const blogRouter = require("./controllers/blogs")
const userRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const resetRouter = require("./controllers/reset")

mongoose.set("strictQuery", false)
logger.info("connecting to", config.MONGODB_URI)

mongoose
	.connect(config.MONGODB_URI)
	.then(() => {
		logger.info("connected to MongoDB")
	})
	.catch((error) => {
		logger.error("error connecting to MongoDB:", error.message)
	})

app.use(cors())
//app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/users", userRouter)

if (process.env.NODE_ENV === "test") {
	app.use("/reset", resetRouter)
}

app.use("/api/login", loginRouter)

app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use("/", blogRouter)

app.use(middleware.errorHandler)

module.exports = app
