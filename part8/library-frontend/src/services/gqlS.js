import { gql } from "@apollo/client"

export const GET_ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`

export const GET_ALL_BOOKS = gql`
	query {
		allBooks {
			title
			author {
				name
			}
			published
			genres
		}
	}
`

export const ADD_BOOK = gql`
	mutation ($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
		addBook(title: $title, author: $author, published: $published, genres: $genres) {
			title
			published
			genres
			author {
				name
			}
		}
	}
`

export const CHANGE_BORN = gql`
	mutation ($name: String!, $setBornTo: Int!) {
		editAuthorBorn(name: $name, setBornTo: $setBornTo) {
			name
			born
		}
	}
`

export const LOGIN_USER = gql`
	mutation ($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`

export const RECOMMENDED = gql`
	mutation {
		recommend
	}
`

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			title
			author {
				name
				born
				bookCount
			}
			published
			genres
		}
	}
`
