const { ApolloServer } = require("@apollo/server")
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer")
const { expressMiddleware } = require("@apollo/server/express4")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const express = require("express")
const cors = require("cors")
const http = require("http")

const { WebSocketServer } = require("ws")
const { useServer } = require('graphql-ws/use/ws')

const jwt = require("jsonwebtoken")

// Defs
const typeDefs = require("./Definitions/defs.js")

const resolvers = require("./Definitions/resolvers.js")
const User = require("./Models/User")

// Config and Db
const mongoose = require("mongoose")
const config = require("./utils/config")

mongoose.set("strictQuery", false)
console.log("connecting to", config.MONGO_URL)

mongoose
	.connect(config.MONGO_URL)
	.then(() => {
		console.log("connected to MongoDB")
	})
	.catch((error) => {
		console.error("error connecting to MongoDB:", error.message)
	})

const start = async () => {
	const app = express()
	const httpServer = http.createServer(app)

	process.on("uncaughtException", (error) => {
		console.error("Erro não tratado:", error)
		process.exit(1)
	})


	const wsServer = new WebSocketServer({
		server: httpServer,
		path: "/",
	})

	const schema = makeExecutableSchema({
		typeDefs,
		resolvers,
	})

	const serverCleanup = useServer({ schema }, wsServer)


	const server = new ApolloServer({
		schema,
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
				  return {
					async drainServer() {
					  await serverCleanup.dispose();
					},
				  };
				},
			  },
		],
		formatError: (error) => {
			if (error.message.includes("GraphQL operations must contain a non-empty `query` or a `persistedQuery` extension.")) {
				return null
			}
			console.error("Error on Server instance", error.message)
			return error
		},
		csrfPrevention: false, // disable csrf prevention
	})

	await server.start()

	app.use(
		"/",
		cors({
			origin: ["http://localhost:4000", "http://localhost:5173"],
			credentials: true,
		}),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req }) => {
				try {
					const auth = req ? req.headers.authorization : null
					if (auth && auth.startsWith("Bearer ")) {
						let token = req.headers.authorization.substring(7)
						const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
						const currentUser = await User.findById(decodedToken.id)
						if (!currentUser) {
							throw new Error("User not found")
						}
						let userData = JSON.parse(JSON.stringify(currentUser))
						return { userData }
					}
				} catch (error) {
					console.error("Error on context", error.message)
					return {
						userData: null,
					}
				}
			},
		})
	)

	const PORT = 4000

	httpServer.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`)
	})
}

start()
