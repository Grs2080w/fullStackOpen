import { gql } from "@apollo/client"

export const SIGN_IN = gql`
	mutation Mutation($credentials: AuthenticateInput) {
		authenticate(credentials: $credentials) {
			accessToken
		}
	}
`

export const CREATE_REVIEW = gql`
	mutation CreateReview($review: CreateReviewInput) {
		createReview(review: $review) {
			id
			createdAt
			repositoryId
		}
	}
`

export const CREATE_NEW_USER = gql`
	mutation CreateUser($user: CreateUserInput) {
		createUser(user: $user) {
			id
			username
		}
	}
`

export const DELETE_REVIEW = gql`
	mutation DeleteReview($deleteReviewId: ID!) {
		deleteReview(id: $deleteReviewId)
	}
`
