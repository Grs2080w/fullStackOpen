import { useEffect } from "react"
import { StyleSheet } from "react-native"
import { HelperText } from "react-native-paper"

export default function Notification({ notification, setNotification }: { notification: string; setNotification: React.Dispatch<React.SetStateAction<string>> }) {
	useEffect(() => {
		if (notification !== " ") {
			setTimeout(() => {
				setNotification(" ")
			}, 3000)
		}
	}, [notification])

	return (
		<HelperText style={stylesCreateReview.Notification} type="error" visible={notification !== " "}>
			{notification}
		</HelperText>
	)
}

const stylesCreateReview = StyleSheet.create({
	Notification: {
		textAlign: "center",
		color: "red",
		fontSize: 15,
		fontWeight: "200",
		margin: 10,
		marginTop: 10,
	},
})
