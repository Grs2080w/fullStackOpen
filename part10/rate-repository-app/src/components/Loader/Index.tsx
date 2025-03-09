import { ProgressBar } from "react-native-paper"
import { View, StyleSheet, Dimensions } from "react-native"

export default function Loader() {
	return (
		<View style={{}}>
			<ProgressBar indeterminate fillStyle={{ backgroundColor: "blue" }} color="blue" style={styles.bar} />
		</View>
	)
}

const styles = StyleSheet.create({ bar: { margin: "auto", width: "50%", marginTop: Dimensions.get("window").height * 0.45, backgroundColor: "white", borderColor: "blue", borderWidth: 1 } })
