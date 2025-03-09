import { View } from "react-native"
import { useState } from "react"

// Components
import AppBar from "../AppBar/Index"
import Notification from "../Notification/Index"
import FormSignUp from "./FormLSignUp"

export default function SignUp() {
	const [notification, setNotification] = useState(" ")
	return (
		<View>
			<AppBar menuActive="signup" />
			<Notification notification={notification} setNotification={setNotification} />
			<FormSignUp setNotification={setNotification} />
		</View>
	)
}
