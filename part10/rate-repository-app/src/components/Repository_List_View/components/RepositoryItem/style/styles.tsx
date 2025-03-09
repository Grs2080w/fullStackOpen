import { StyleSheet, Platform } from "react-native"

const styles = StyleSheet.create({
	text: {
		fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
		fontSize: 13,
	},
	title: {
		fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
		fontWeight: "bold",
		fontSize: 15,
	},
	description: {
		marginBottom: 10,
		width: 300,
		color: "gray",
		fontSize: 13,
		fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
	},
	analytics: {
		fontWeight: "bold",
		fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
	},
	analyticsColumn: { display: "flex", flexDirection: "column", alignItems: "center" },
	buttonGit: {
		backgroundColor: "blue",
		color: "",
		padding: 7,
		borderRadius: 5,
		width: "80%",
	},
})

export default styles
