import { StyleSheet, Platform } from "react-native"

const styles = StyleSheet.create({
	viewFrom: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",

		borderRadius: 5,
		borderColor: "lightgray",
		borderWidth: 1,
		backgroundColor: "white",
		padding: 10,
		margin: 10,

		fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
	},
	input: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: "lightgray",

		width: 300,
		padding: 10,
		marginVertical: 5,
		backgroundColor: "white",

		fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
	},
	noti: {
		color: "red",
		fontWeight: "400",
		backgroundColor: "white",
		padding: 2,
		borderRadius: 5,
		lineHeight: 10,

		paddingTop: 4,
		paddingBottom: 0,
		marginTop: 0,
		marginBottom: 0,

		fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
	},
	button: {
		marginTop: 20,
		marginBottom: 20,
	},
	Notification: { textAlign: "center", color: "red", fontSize: 15, fontWeight: "600", margin: 10, marginTop: 10 },
})

export default styles
