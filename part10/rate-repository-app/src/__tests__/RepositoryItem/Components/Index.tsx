import { View, Text, Image, Button } from "react-native"

interface Repository {
	id: String
	fullName: String
	description: String
	language: string
	forksCount: number
	stargazersCount: number
	ratingAverage: number
	reviewCount: number
	ownerAvatarUrl: string
}

const formatNumber = (num: number) => {
	return num >= 1000 ? (num / 1000).toPrecision(3) + "k" : num
}

const AnalyticsItem = ({ value, label }: { value: string | number; label: string }) => (
	<View accessibilityLabel={`${label}: ${value}`}>
		<Text testID="ValueItem">{value}</Text>
		<Text testID="LabelItem">{label}</Text>
	</View>
)

export default function Index({ repository }: { repository: Repository }) {
	return (
		<View style={{ display: "flex", flexDirection: "column" }}>
			<View style={{ display: "flex", flexDirection: "row", padding: 15 }}>
				<Image source={{ uri: repository.ownerAvatarUrl }} style={{ width: 50, height: 50, borderRadius: 5 }} />
				<View style={{ paddingLeft: 15 }}>
					<Text testID="TitleItem">{repository.fullName}</Text>
					<Text testID="DescriptionItem">{repository.description}</Text>
					<Text>
						<Button title={repository.language} onPress={() => {}} />
					</Text>
				</View>
			</View>

			<View style={{ flexDirection: "row", justifyContent: "space-around", paddingBottom: 15 }}>
				<AnalyticsItem  value={formatNumber(repository.stargazersCount)} label="Stars" />
				<AnalyticsItem  value={formatNumber(repository.forksCount)} label="Forks" />
				<AnalyticsItem  value={repository.reviewCount} label="Reviews" />
				<AnalyticsItem  value={repository.ratingAverage} label="Rating" />
			</View>
		</View>
	)
}
