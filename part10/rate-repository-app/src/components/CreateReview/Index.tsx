import { useState } from "react"
import { View } from "react-native"

// Components
import AppBar from "../AppBar/Index"
import FormInputCreateReview from "./components/FormInputCreateReview"
import Notification from "../Notification/Index"

export default function CreateReview() {
	const [notification, setNotification] = useState(" ")

	return (
		<View>
			<AppBar menuActive="createReview" />
			<Notification notification={notification} setNotification={setNotification} />
			<FormInputCreateReview setNotification={setNotification} />
		</View>
	)
}
