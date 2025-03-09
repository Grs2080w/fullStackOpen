import { StyleSheet, Platform } from "react-native"

const stylesCreateReview = StyleSheet.create({
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
		fontWeight: "bold",
		marginBottom: 5,
		backgroundColor: "white",
		padding: 2,
		borderRadius: 5,

		fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
	},
	button: {
		marginTop: 20,
		marginBottom: 20,
	},
})

export { stylesCreateReview }
