import AsyncStorage from "@react-native-async-storage/async-storage"

class AuthStorage {
	private namespace: string

	constructor(namespace = "auth") {
		this.namespace = namespace
	}

	async getAccessToken() {
		return await AsyncStorage.getItem(`${this.namespace}:accessToken`)
	}

	async setAccessToken(accessToken: string) {
		await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken)
	}

	async removeAccessToken() {
		await AsyncStorage.removeItem(`${this.namespace}:accessToken`)
	}
}

// Class to administer the token

export default AuthStorage
