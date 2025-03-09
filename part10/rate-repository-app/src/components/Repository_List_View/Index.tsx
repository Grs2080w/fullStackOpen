import { ScrollView } from "react-native"
import { useState } from "react"

// Types
import { Order } from "../../types/types"

// Hooks
import useRepositoriesQuery from "../../hooks/useRepositoriesQuery"

// Components
import AppBar from "../AppBar/Index"
import RepositoryListRender from "./components/RepositoryListRender"
import SelectRepoByOrder from "./components/SelectRepoByOrder"

export default function RepositoryList() {
	const [orderBy, setOrderBy] = useState<Order>({
		orderBy: "CREATED_AT",
		orderDirection: "DESC",
		searchKeyword: "",
	})

	const { repositories } = useRepositoriesQuery(orderBy)

	return (
		<ScrollView>
			<AppBar menuActive="repositories" />
			<SelectRepoByOrder setOrderBy={setOrderBy} />
			<RepositoryListRender repositories={repositories} />
		</ScrollView>
	)
}
