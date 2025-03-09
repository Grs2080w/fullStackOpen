import { useContext } from "react"
import AuthStorageContext from "../context/AuthStorageContext"

/**
 * useAuthStorage
 *
 * @description
 * This hook return the Class AuthStorage created in the utils/authStorage.com.ts
 * The Class AuthStorage is used to store the token of the user authenticated.
 * The token is used to authenticate the user for each request to the server.
 * The token is stored in the Async Storage of the device.
 * The context is used by the hook useAuthStorage to get the token and to set the token.
 * The context is used by the component App to get the token and to set the token.
 * The context is used by the component SignIn to set the token.
 * The context is used by the component SignOut to remove the token.
 *
 * @returns {AuthStorage} The class AuthStorage
 *
 */

const useAuthStorage = () => {
	return useContext(AuthStorageContext)
}

export default useAuthStorage
