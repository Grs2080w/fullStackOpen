import { NavigateFunction } from "react-router-native"
import { useApolloClient } from "@apollo/client"

// Hooks
import useAuthStorage from "./useAuthStorage"

/**
 * useSignOut
 *
 * @description
 * This hook is used to sign out the user.
 * The hook uses the useApolloClient hook to get the ApolloClient.
 * The hook uses the useAuthStorage hook to get the AuthStorage.
 * The hook returns a function that can be used to sign out the user.
 * The function takes the NavigateFunction as an argument.
 * The function removes the access token from the AsyncStorage.
 * The function resets the ApolloClient store.
 * The function navigates the user to the "/" route.
 * @param {NavigateFunction} Navigate
 * @returns {(Navigate: NavigateFunction) => Promise<void>}
 */

export default function useSignOut() {
	const apolloClient = useApolloClient()
	const authStorage = useAuthStorage()

	async function signOut(Navigate: NavigateFunction) {
		authStorage.removeAccessToken()
		apolloClient.resetStore()
		Navigate("/")
	}

	return [signOut]
}
