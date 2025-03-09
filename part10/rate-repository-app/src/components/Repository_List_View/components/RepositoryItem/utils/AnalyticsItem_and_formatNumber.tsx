import { View, Text } from "react-native"
import styles from "../style/styles"

interface Params {
	value: number | string
	label: string
}

export function AnalyticsItem({ value, label }: Params) {
	return (
		<View style={styles.analyticsColumn} accessibilityLabel={`${label}: ${value}`}>
			<Text style={styles.analytics}>{value}</Text>
			<Text>{label}</Text>
		</View>
	)
}

export function formatNumber(num: number) {
	return num >= 1000 ? (num / 1000).toPrecision(3) + "k" : num
}
