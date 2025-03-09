import { ApolloError } from "@apollo/client"
import { MutationFunctionOptions, OperationVariables, DefaultContext, ApolloCache } from "@apollo/client"
import { NavigateFunction } from "react-router-native"

interface Params {
	values: {
		username: string
		password: string
		passwordConfirmation: string
	}
	createNewUser: (options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>> | undefined) => Promise<any>
	signIn: (credentials: any) => Promise<any>
	Navigate: NavigateFunction
	setNotification: React.Dispatch<React.SetStateAction<string>>
}

function onSubmitSignUp({ values, createNewUser, signIn, Navigate, setNotification }: Params) {
	const { username, password } = values

	createNewUser({ variables: { user: { username, password } } })
		.then(async () => {
			const data = await signIn({ username, password })
			data?.authenticate?.accessToken && Navigate("/")
		})
		.catch((e: ApolloError) => setNotification(e.message))
}

export default onSubmitSignUp
