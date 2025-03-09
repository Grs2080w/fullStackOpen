import { useState, useEffect } from "react"
import { List } from "react-native-paper"
import { View } from "react-native"

import { useDebounce } from "use-debounce"

// Types
import { Order } from "../../../types/types"

// Components
import SearchBar from "./SearchBar"

// Style
import { stylesSelectRepoByOrder } from "./styles/style"

const SelectRepoByOrder = ({ setOrderBy }: { setOrderBy: React.Dispatch<React.SetStateAction<Order>> }) => {
	const [title, setTitle] = useState("Latest repositories")
	const [expanded, setExpanded] = useState(false)
	const [hover1, sethover1] = useState(false)
	const [hover2, sethover2] = useState(false)
	const [hover3, sethover3] = useState(false)

	const [searchQuery, setSearchQuery] = useState("")
	const [valueSearch] = useDebounce(searchQuery, 300)

	function setApolloSearch(string: string) {
		switch (string) {
			case "Latest repositories":
				setOrderBy({
					orderBy: "CREATED_AT",
					orderDirection: "DESC",
					searchKeyword: valueSearch,
				})
				break
			case "Highest rated repositories":
				setOrderBy({
					orderBy: "RATING_AVERAGE",
					orderDirection: "DESC",
					searchKeyword: valueSearch,
				})
				break
			case "Lowest rated repositories":
				setOrderBy({
					orderBy: "RATING_AVERAGE",
					orderDirection: "ASC",
					searchKeyword: valueSearch,
				})
				break
		}
	}

	useEffect(() => {
		setApolloSearch(title)
	}, [valueSearch])

	const handlePress = () => setExpanded(!expanded)

	function listItemPressed(string: string) {
		setApolloSearch(string)
		handlePress()
		setTitle(string)
	}

	const styles = stylesSelectRepoByOrder(hover1, hover2, hover3)

	return (
		<View>
			<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
			<List.Section style={{ marginTop: 0, borderBottomColor: "black", borderBottomWidth: 0, borderTopWidth: 0 }}>
				<List.Accordion title={title} expanded={expanded} onPress={handlePress}>
					<List.Item onHoverOut={() => sethover1(false)} onHoverIn={() => sethover1(true)} onPress={() => listItemPressed("Latest repositories")} style={styles.itemList1} title="Latest repositories" titleStyle={{ color: hover1 ? "white" : "black" }} />
					<List.Item onHoverOut={() => sethover2(false)} onHoverIn={() => sethover2(true)} onPress={() => listItemPressed("Highest rated repositories")} style={styles.itemList2} title="Highest rated repositories" titleStyle={{ color: hover2 ? "white" : "black" }} />
					<List.Item onHoverOut={() => sethover3(false)} onHoverIn={() => sethover3(true)} onPress={() => listItemPressed("Lowest rated repositories")} style={styles.itemList3} title="Lowest rated repositories" titleStyle={{ color: hover3 ? "white" : "black" }} />
				</List.Accordion>
			</List.Section>
		</View>
	)
}

export default SelectRepoByOrder
