import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Platform } from "react-native"
import { useNavigate } from "react-router-native"

const styles = StyleSheet.create({
	container: {
		fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
		height: 90,
		width: "100%",
		backgroundColor: "#24292e",
		paddingLeft: 20,

		display: "flex",
		justifyContent: "center",
		flexDirection: "row",

		borderBottomColor: "black",
		borderBottomWidth: 3,
	},
	text: {
		fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
		paddingTop: 30,
		marginHorizontal: 10,
	},
})

const AppBar = () => {
	const Navigate = useNavigate()

	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={{ margin: "auto", paddingBottom: 15 }} horizontal>
				<TouchableOpacity onPress={() => Navigate("/")}>
					<Text style={styles.text}>Repositories</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => Navigate("/signin")}>
					<Text style={styles.text}>SignIn</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	)
}

export default AppBar
