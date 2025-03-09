import { StyleSheet, Platform } from "react-native"

const stylesAppBar = StyleSheet.create({
	container: {
		fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
		height: 90,
		width: "100%",
		backgroundColor: "#24292e",

		display: "flex",
		justifyContent: "center",
		flexDirection: "row",

		borderBottomColor: "black",
		borderBottomWidth: 3,
		padding: 10,
	},
	text: {
		fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
		fontSize: 14.9,
		fontWeight: "bold",
		marginHorizontal: 10,
		color: "white",
	},
	menuSelect: {
		height: 30,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 5,
	},
})

function menuSelectStyle(selected: string, menuActive: string) {
	return { ...stylesAppBar.menuSelect, backgroundColor: menuActive === selected ? "white" : "transparent" }
}

function menuSelectTextStyle(selected: string, menuActive: string) {
	return { ...stylesAppBar.text, color: menuActive === selected ? "black" : "white" }
}

export { stylesAppBar, menuSelectStyle, menuSelectTextStyle }
