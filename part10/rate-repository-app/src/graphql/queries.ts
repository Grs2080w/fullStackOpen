import { gql } from "@apollo/client"

export const QUERY_REPOSITORIES = gql`
	query Repositories($repositoriesOrderDirection2: OrderDirection, $repositoriesOrderBy2: AllRepositoriesOrderBy, $searchKeyword: String) {
		repositories(orderDirection: $repositoriesOrderDirection2, orderBy: $repositoriesOrderBy2, searchKeyword: $searchKeyword) {
			edges {
				node {
					description
					fullName
					language
					stargazersCount
					forksCount
					reviewCount
					ratingAverage
					ownerAvatarUrl
					id
					createdAt
				}
			}
		}
	}
`

export const QUERY_ME = gql`
	query Me {
		me {
			id
			username
		}
	}
`

export const QUERY_REPOSITORY = gql`
	query Repository($repositoryId2: ID!) {
		repository(id: $repositoryId2) {
			id
			url
			description
			forksCount
			fullName
			language
			openIssuesCount
			ownerAvatarUrl
			ratingAverage
			stargazersCount
			reviewCount
		}
	}
`

export const QUERY_REVIEWS = gql`
	query Repository($repositoryId3: ID!) {
		repository(id: $repositoryId3) {
			id
			fullName
			reviews {
				edges {
					node {
						text
						rating
						createdAt
						id
						user {
							username
						}
					}
				}
			}
		}
	}
`

export const QUERY_REVIEW_ID = gql`
	query Repositories($repositoriesOwnerName2: String) {
		repositories(ownerName: $repositoriesOwnerName2) {
			edges {
				node {
					id
					name
				}
			}
		}
	}
`

export const QUERY_MY_REVIEWS = gql`
	query Reviews {
		me {
			reviews {
				edges {
					node {
						id
						createdAt
						rating
						repository {
							fullName
							id
						}
						text
					}
				}
			}
		}
	}
`
