import { View, Text, Image, Button, Pressable, TouchableOpacity } from "react-native"
import { useNavigate } from "react-router-native"
import { openURL } from "expo-linking"

// Types
import { Repository } from "../../../../types/types"

// Style
import styles from "./style/styles"

// Hooks
import useScreenWidth from "@/src/hooks/useScreenWidth"

// Components
import { AnalyticsItem, formatNumber } from "./utils/AnalyticsItem_and_formatNumber"

interface Props {
	repository: Repository
}

export default function RepositoryItem({ repository }: Props) {
	const Navigate = useNavigate()
	const screenWidth = useScreenWidth()

	return (
		<View style={{ display: "flex", flexDirection: "column", width: screenWidth }}>
			<Pressable onPress={() => Navigate(`/repository/${repository.id}`)}>
				<View style={{ display: "flex", flexDirection: "row", padding: 15 }}>
					<Image source={{ uri: repository.ownerAvatarUrl }} style={{ width: 50, height: 50, borderRadius: 5 }} />
					<View style={{ paddingLeft: 15 }}>
						<Text style={styles.title}>{repository.fullName}</Text>
						<Text style={styles.description}>{repository.description}</Text>
						<Text>
							<Button color={"blue"} title={repository.language} onPress={() => {}} />
						</Text>
					</View>
				</View>
			</Pressable>

			<View style={{ flexDirection: "row", justifyContent: "space-around", paddingBottom: 15 }}>
				<AnalyticsItem value={formatNumber(repository.stargazersCount)} label="Stars" />
				<AnalyticsItem value={formatNumber(repository.forksCount)} label="Forks" />
				<AnalyticsItem value={repository.reviewCount} label="Reviews" />
				<AnalyticsItem value={repository.ratingAverage} label="Rating" />
			</View>

			{/* code for open in github in Components Repository_Single_view/index.tsx */}
			{repository.url && (
				<View style={{ flexDirection: "row", justifyContent: "center" }}>
					<TouchableOpacity style={styles.buttonGit} onPress={() => openURL(repository.url!)}>
						<Text style={{ color: "white", textAlign: "center" }}>Open in GitHub</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	)
}
