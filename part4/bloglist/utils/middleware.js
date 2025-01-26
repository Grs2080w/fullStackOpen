const logger = require("./logger")
const jwt = require("jsonwebtoken")

const requestLogger = (request, response, next) => {
	logger.info("timestamp:  ", new Date())
	logger.info("Method:  ", request.method)
	logger.info("Path:  ", request.path)
	logger.info("Body:  ", request.body)
	logger.info("ip:  ", request.ip)
	logger.info("---")
	next()
}

const errorHandler = (error, request, response, next) => {
	logger.error(error.message, error.name)

	if (response.headersSent) {
		return next(error)
	}

	if (error.name === "CastError") {
		return response.status(400).send({ error: "malformatted id" })
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message })
	} else if (error.name === "JsonWebTokenError") {
		return response.status(400).json({ error: error.message })
	}

	next(error)
}

const tokenExtractor = (request, response, next) => {
	if (request.url === "/favicon.ico") {
		return
	}

	const authorization = request.get("Authorization")

	if (authorization && authorization.startsWith("Bearer ")) {
		request.token = authorization.replace("Bearer ", "")
	} else {
		response.status(401).json({ error: "token missing or invalid" })
	}

	next()
}

const userExtractor = (request, response, next) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	let user = JSON.parse(JSON.stringify(decodedToken))
	request.user = user

	next()
}

module.exports = {
	requestLogger,
	errorHandler,
	tokenExtractor,
	userExtractor,
}
