import { createContext } from "react"

/**
 * @module AuthStorageContext
 * @description
 * This context is used to store the token of the user authenticated.
 * The token is used to authenticate the user for each request to the server.
 * The token is stored in the Async Storage of the device.
 * The context is used by the hook useAuthStorage to get the token and to set the token.
 * The context is used by the component App to get the token and to set the token.
 * The context is used by the component SignIn to set the token.
 * The context is used by the component SignOut to remove the token.
 */

const AuthStorageContext = createContext()

export default AuthStorageContext
