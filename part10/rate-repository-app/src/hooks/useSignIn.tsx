import { useMutation, useApolloClient } from "@apollo/client"
import { SIGN_IN } from "../graphql/mutations"

// Hooks
import useAuthStorage from "./useAuthStorage"

/**
 * useSignIn
 *
 * @description
 * This hook is used to sign in the user.
 * The hook uses the SIGN_IN mutation to authenticate the user.
 * The hook returns a function that can be used to sign in the user.
 * The function takes the credentials of the user as an argument.
 * The function returns the result of the mutation.
 * @returns {(credentials: any) => Promise<{ data: any; errors: any; }>}
 */

export default function useSignIn() {
	const [SingIn] = useMutation(SIGN_IN)
	const apolloClient = useApolloClient()
	const authStorage = useAuthStorage()

	async function signIn(credentials: any) {
		const { data } = await SingIn({ variables: { credentials } })
		authStorage.setAccessToken(data.authenticate?.accessToken)
		apolloClient.resetStore()
		return data
	}

	return [signIn]
}
