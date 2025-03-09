// Apollo
import { useQuery } from "@apollo/client"
import { QUERY_REPOSITORIES } from "../graphql/queries"

// Types
import { Repository, Order } from "../types/types"

/**
 * Hook that fetches repositories from the server with the given order
 * and returns the repos and a boolean indicating whether the data is loading
 * @param {Order} orderBy - The order to fetch the repositories in
 * @returns {{repositories: Repository[], loading: boolean}}
 */

export default function useRepositoriesQuery(orderBy: Order) {
	const { loading, data } = useQuery(QUERY_REPOSITORIES, {
		variables: {
			repositoriesOrderBy2: orderBy.orderBy,
			repositoriesOrderDirection2: orderBy.orderDirection,
			searchKeyword: orderBy.searchKeyword,
		},
		fetchPolicy: "cache-and-network",
	})

	const repositories: Repository[] = data?.repositories?.edges?.map((edge: any) => edge.node)

	return {
		repositories,
		loading,
	}
}
