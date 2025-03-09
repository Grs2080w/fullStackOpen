import Loader from "../../Loader/Index"

import { View } from "react-native"
import { Repository } from "@/src/types/types"
import RepositoryItem from "./RepositoryItem/Index"

interface Props {
	repositories: Repository[] | undefined
}

export default function RepositoryListRender({ repositories }: Props) {
	if (!repositories) return <Loader />

	const ItemSeparator = () => <View style={{ height: 1, backgroundColor: "#e1e4e8" }} />

	return (
		<View>
			{repositories?.map((repository, index) => (
				<View key={index}>
					<RepositoryItem repository={repository} />
					<ItemSeparator />
				</View>
			))}
		</View>
	)
}
