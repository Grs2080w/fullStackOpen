import { StyleSheet } from "react-native"

export function stylesSelectRepoByOrder(hover1: boolean, hover2: boolean, hover3: boolean) {
	const styles = StyleSheet.create({
		itemList1: {
			backgroundColor: hover1 ? "#13222A" : "white",
			color: "black",
			borderBottomColor: "lightgray",
			borderBottomWidth: 1,
		},
		itemList2: {
			backgroundColor: hover2 ? "#13222A" : "white",
			color: "black",
			borderBottomColor: "lightgray",
			borderBottomWidth: 1,
		},
		itemList3: {
			backgroundColor: hover3 ? "#13222A" : "white",
			color: "black",
			borderBottomColor: "black",
			boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.25)",
		},
	})

	return styles
}
