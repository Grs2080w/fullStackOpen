const { GraphQLError, createSourceEventStream } = require("graphql")
const jwt = require("jsonwebtoken")

const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()

// Models
const Author = require("../Models/Author")
const Book = require("../Models/Book")
const User = require("../Models/User")

const resolvers = {
	Query: {
		bookCount: async () => Book.countDocuments(),
		authorCount: async () => Author.countDocuments(),
		allBooks: async (_, args) => {
			if (args.author && args.genre) {
				return Book.find({ genre: args.genre, author: args.author })
			} else if (args.author) {
				return Book.find({ author: args.author })
			} else if (args.genre) {
				return Book.find({ genre: args.genre })
			} else {
				return Book.find({})
			}
		},
		allAuthors: async (_a, _b, _c, info) => {
			let AllBooks = await Book.find({})
			AllBooks = JSON.parse(JSON.stringify(AllBooks))
			let AllAuthors = await Author.find({})
			AllAuthors = JSON.parse(JSON.stringify(AllAuthors))

			AllAuthors.forEach((author) => {
				author.bookCount = AllBooks.filter((book) => book.author.name === author.name).length
			})

			return AllAuthors
		},

		me: async (root, args, { userData }) => {
			return userData
		},
	},
	Mutation: {
		addBook: async (_, args, { userData }) => {
			if (!userData) {
				return new GraphQLError("User not authenticated", {
					extensions: {
						code: "UNAUTHENTICATED",
					},
				})
			}

			let authorName = args.author ? args.author : "No author"
			let author = await Author.find({ name: authorName })

			if (!author.length) {
				try {
					let newAuthor = new Author({ name: authorName, born: null })
					newAuthor.save()
				} catch (error) {
					new GraphQLError("Error on save author of the book added")
					console.log("Error on save author of the book added", error)
				}
			}

			let realyAuthor = await Author.find({ name: authorName })
			realyAuthor = JSON.parse(JSON.stringify(realyAuthor[0] ? realyAuthor[0] : { name: "No author", born: null, id: toString(Math.floor(Math.random() * 1000000)) }))

			let newBook = {
				title: args.title,
				published: args.published ? args.published : 0,
				genres: args.genres ? args.genres : "No genres",
				author: realyAuthor ? realyAuthor : { name: "No author" },
			}

			console.log("new author added in newBook", newBook.author)

			if (newBook.title.length < 3 || newBook.author.name.length < 3) {
				return new GraphQLError("Title and Author missing 3 or more characters")
			}

			try {
				let dbBook = new Book(newBook)
				dbBook.save()
			} catch (error) {
				new GraphQLError("Error on save book added")
				console.log("Error on save book added", error.message)
			}

			pubsub.publish("BOOK_ADDED", { bookAdded: newBook })

			return newBook
		},
		editAuthorBorn: async (_, args, { userData }) => {
			if (!userData) {
				return new GraphQLError("User not authenticated", {
					extensions: {
						code: "UNAUTHENTICATED",
					},
				})
			}

			let author = await Author.find({ name: args.name })

			if (!author.length) {
				return new GraphQLError("Author not found")
			}

			try {
				await Author.findOneAndUpdate({ name: args.name }, { $set: { born: args.setBornTo } })
				await Book.updateMany({ "author.name": args.name }, { $set: { "author.born": args.setBornTo } })
			} catch (error) {
				new GraphQLError("Error on save author the editBorn Author")
				console.log("Error on save author the editBorn Author", error)
			}

			let realyAuthor = await Author.find({ name: args.name })

			return realyAuthor[0]
		},
		createUser: async (_, args) => {
			const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

			try {
				return user.save()
			} catch (error) {
				new GraphQLError("Error on save user", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args.username,
						error,
					},
				})
				console.log("Error on save user", error)
			}
		},
		login: async (_, args) => {
			let user = await User.findOne({ username: args.username })

			if (!user || args.password !== "yeshua") {
				return new GraphQLError("wrong username or password", {
					extensions: {
						code: "WRONG_CREDENTIALS",
						invalidArgs: user ? [args.password] : args.password === "yeshua" ? [args.username] : [args.password, args.username],
					},
				})
			}

			user = JSON.parse(JSON.stringify(user))

			const userToken = {
				username: args.username,
				id: user.id,
			}

			return {
				value: jwt.sign(userToken, process.env.JWT_SECRET),
			}
		},
		recommend: async (_, args, { userData }) => {
			if (!userData) {
				return new GraphQLError("User not authenticated", {
					extensions: {
						code: "UNAUTHENTICATED",
					},
				})
			}

			let genresFav = userData.favoriteGenre
			return [genresFav]
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterableIterator(["BOOK_ADDED"]),
		},
	},
	Book: {
		author: (root) => root.author,
		genres: (root) => root.genres,
		published: (root) => root.published,
		title: (root) => root.title,
	},

	Author: {
		id: (root) => root.id,
		name: (root) => root.name,
		born: (root) => root.born,
	},
}

module.exports = resolvers
