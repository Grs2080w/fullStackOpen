import { View } from "react-native"
import { Searchbar } from "react-native-paper"

const SearchBar = ({ searchQuery, setSearchQuery }: { searchQuery: string; setSearchQuery: React.Dispatch<React.SetStateAction<string>> }) => {
	return (
		<View style={{ backgroundColor: "#1C1B1F" }}>
			<Searchbar style={{ margin: 10 }} placeholder="Search Repositories" onChangeText={setSearchQuery} value={searchQuery} />
		</View>
	)
}

export default SearchBar
