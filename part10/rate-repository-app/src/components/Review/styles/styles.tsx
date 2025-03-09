import { StyleSheet } from "react-native"

const style = StyleSheet.create({
	main: {
		padding: 5,
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		marginTop: 10,
		paddingBottom: 20,
	},
	secondView: {
		padding: 5,
		width: "100%",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 10,
		borderBottomColor: "lightgray",
		borderBottomWidth: 1,
		paddingBottom: 20,
	},
	rating: {
		width: "20%",
		maxWidth: 150,
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "center",
		paddingTop: 5,
	},
	ratingNumber: {
		borderRadius: "50%",
		borderColor: "blue",
		borderWidth: 3,
		width: 50,
		height: 50,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		maxWidth: 60,
		maxHeight: 60,
	},
	username: {
		fontWeight: "600",
		fontSize: 16,
	},
	data: {
		color: "gray",
		fontSize: 13,
		marginTop: 2,
	},
	text: {
		maxWidth: "95%",
		marginVertical: 5,
	},
})

export default style
