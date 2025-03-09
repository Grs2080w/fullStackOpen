import { View, ScrollView } from "react-native"

// GraphQl
import { useQuery } from "@apollo/client"
import { QUERY_ME } from "../../graphql/queries"

// Hooks
import useScreenWidth from "@/src/hooks/useScreenWidth"

// Styles
import { stylesAppBar } from "./style/style"

// Components
import UserLogged from "./components/UserLogged"
import UserNotLooged from "./components/UserNotLooged"

const AppBar = ({ menuActive }: { menuActive: string }) => {
	const { data } = useQuery(QUERY_ME)
	const screenWidth = useScreenWidth()

	return (
		<View style={[stylesAppBar.container, { width: screenWidth }]}>
			<ScrollView contentContainerStyle={{ margin: "auto" }} horizontal>
				{data?.me !== null ? <UserLogged menuActive={menuActive} /> : <UserNotLooged menuActive={menuActive} />}
			</ScrollView>
		</View>
	)
}

export default AppBar
