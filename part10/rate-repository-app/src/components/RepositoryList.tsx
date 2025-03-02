import { View, Dimensions, FlatList} from "react-native"

import RepositoryItem from "./RepositoryItem"
import repositories from "../data/repository"
import AppBar from "./AppBar"

const ItemSeparator = () => <View style={{ height: 5, backgroundColor: "#e1e4e8" }} />

export default function RepositoryList() {
	return <FlatList ListHeaderComponent={AppBar} style={{ backgroundColor: "white", width: Dimensions.get("window").width + 1 }} ItemSeparatorComponent={ItemSeparator} data={repositories} renderItem={({ item: repository }) => <RepositoryItem repository={repository} />} keyExtractor={(repository) => repository.id} />
}
