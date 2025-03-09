import { ApolloError } from "@apollo/client"
import { NavigateFunction } from "react-router-native"

interface Params {
	values: {
		username: string
		password: string
	}
	signIn: (credentials: { username: string; password: string }) => Promise<any>
	Navigate: NavigateFunction
	setNotification: React.Dispatch<React.SetStateAction<string>>
}

const onSubmitSignIn = async ({ values, signIn, Navigate, setNotification }: Params) => {
	const { username, password } = values

	try {
		const data = await signIn({ username, password })
		data?.authenticate?.accessToken && Navigate("/")
	} catch (e) {
		e instanceof ApolloError && setNotification(e.message)
	}
}

export default onSubmitSignIn
