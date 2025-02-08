const { GraphQLError } = require("graphql")
const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")

let persons = [
	{
		name: "Arto Hellas",
		phone: "040-123543",
		street: "Tapiolankatu 5 A",
		city: "Espoo",
		id: "3d594650-3436-11e9-bc57-8b80ba54c431",
	},
	{
		name: "Matti Luukkainen",
		phone: "040-432342",
		street: "Malminkaari 10 A",
		city: "Helsinki",
		id: "3d599470-3436-11e9-bc57-8b80ba54c431",
	},
	{
		name: "Venla Ruuska",
		street: "Nallemäentie 22 C",
		city: "Helsinki",
		id: "3d599471-3436-11e9-bc57-8b80ba54c431",
	},
]

const typeDefs = `
    type Address {
        street: String!
        city: String!
    }

    type Mutation {
        addPerson(
            name: String!
            phone: String
            street: String!
            city: String!
        ): Person,
        editNumber(name: String!, phone: String!): Person
    }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  enum YesNo {
    YES
    NO
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }
`

const resolvers = {
	Query: {
		personCount: () => persons.length,
		allPersons: (root, args) => {
			if (!args.phone) {
				return persons
			}
			const byPhone = (person) => (args.phone === "YES" ? person.phone : !person.phone)
			return persons.filter(byPhone)
		},
		findPerson: (root, args) => {
			let user = persons.find((p) => p.name === args.name)
			if (!user) {
				throw new GraphQLError(`User ${args.name} not found`, {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args.name,
					},
				})
			}

			return user
		},
	},
	Person: {
		id: (root) => root.id,
		name: (root) => root.name,
		phone: (root) => root.phone,
		address: (root) => {
			return {
				street: root.street,
				city: root.city,
			}
		},
	},

	Mutation: {
		addPerson: (root, args) => {
			const person = {
				name: args.name,
				phone: args.phone,
				street: args.street,
				city: args.city,
				id: String(persons.length + 1),
			}

			if (persons.find((p) => p.name === person.name)) {
				throw new GraphQLError(`User ${person.name} already exists`, {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: person.name,
					},
				})
			}

			persons = persons.concat(person)
			return person
		},
        editNumber: (root, args) => {

            const person = persons.find(p => p.name === args.name)
            person.phone = args.phone
            
            persons.map(p => {
                if (p.name === args.name) {
                    return {...p, phone: args.phone}
                }
            })

            return person
        }
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
