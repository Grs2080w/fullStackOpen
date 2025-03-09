import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

// Utils
import AuthStorage from "../utils/authStorage.com"

// Expo
import Constants from "expo-constants"
//Constants.expoConfig?.extra?.APOLO_URI

/**
 * @module apolloClient.com
 * @description
 * This file contains the Apollo Client configuration.
 * The Apollo Client is used to make queries to the server.
 * The Apollo Client is configured to use the `InMemoryCache` to cache the responses.
 * The Apollo Client is configured to use the `setContext` function to set the `Authorization` header of the requests.
 * The `Authorization` header is set to the value of the `accessToken` property of the `AuthStorage` object.
 * The `AuthStorage` object is passed as an argument to the `createApolloClient` function.
 * The `createApolloClient` function returns an instance of the `ApolloClient` class.
 * The `ApolloClient` instance is used in the components to make queries to the server.
 */

const httpLink = createHttpLink({
	uri: Constants.expoConfig?.extra?.APOLO_URI,
})

const createApolloClient = (authStorage: AuthStorage) => {
	const authLink = setContext(async (_, { headers }) => {
		try {
			const accessToken = await authStorage.getAccessToken()
			return {
				headers: {
					...headers,
					authorization: accessToken ? `Bearer ${accessToken}` : "",
				},
			}
		} catch (e) {
			console.log(e)
			return {
				headers,
			}
		}
	})
	return new ApolloClient({
		link: authLink.concat(httpLink),
		cache: new InMemoryCache({}),
	})
}

export default createApolloClient
