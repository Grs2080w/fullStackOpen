import { View, Text, Image, Button, Platform, StyleSheet } from "react-native"
import { Repository } from "../types"


interface Props {
	repository: Repository
}

const formatNumber = (num) => {
	return num >= 1000 ? (num / 1000).toPrecision(3) + "k" : num
}

const AnalyticsItem = ({ value, label }) => (
	<View style={styles.analyticsColumn} accessibilityLabel={`${label}: ${value}`}>
		<Text style={styles.analytics}>{value}</Text>
		<Text>{label}</Text>
	</View>
)

export default function RepositoryItem({ repository }: Props) {
	return (
		<View>
			<View style={{ display: "flex", flexDirection: "row", padding: 15 }}>
				<Image source={{ uri: repository.ownerAvatarUrl }} style={{ width: 50, height: 50, borderRadius: 5 }} />
				<View style={{ paddingLeft: 15 }}>
					<Text style={styles.title}>{repository.fullName}</Text>
					<Text style={styles.description}>{repository.description}</Text>
					<Text>
						<Button title={repository.language} onPress={() => {}} />
					</Text>
				</View>
			</View>

			<View style={{ flexDirection: "row", justifyContent: "space-around", paddingBottom: 15 }}>
				<AnalyticsItem value={formatNumber(repository.stargazersCount)} label="Stars" />
				<AnalyticsItem value={formatNumber(repository.forksCount)} label="Forks" />
				<AnalyticsItem value={repository.reviewCount} label="Reviews" />
				<AnalyticsItem value={repository.ratingAverage} label="Rating" />
			</View>
		</View>
	)
}

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
})
