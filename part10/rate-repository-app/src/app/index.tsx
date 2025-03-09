import { NativeRouter } from "react-router-native"

// Routes
import MainRouter from "./mainRouter"

// Apollo
import { ApolloProvider } from "@apollo/client"
import createApolloClient from "../utils/apolloClient.com"

// Context
import AuthStorageContext from "../context/AuthStorageContext"

// Class
import AuthStorage from "../utils/authStorage.com"

// Instance class AuthStorage
const authStorage = new AuthStorage()

// Apollo Client
const apolloClient = createApolloClient(authStorage)

// Style
import { PaperProvider } from "react-native-paper"

export default function App() {
	return (
		<NativeRouter>
			<ApolloProvider client={apolloClient}>
				<AuthStorageContext.Provider value={authStorage}>
					<PaperProvider>
						<MainRouter />
					</PaperProvider>
				</AuthStorageContext.Provider>
			</ApolloProvider>
		</NativeRouter>
	)
}
