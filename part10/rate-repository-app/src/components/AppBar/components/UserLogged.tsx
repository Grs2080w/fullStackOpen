import { View, Text, TouchableOpacity } from "react-native"

import { useNavigate } from "react-router-native"
import { menuSelectTextStyle, menuSelectStyle } from "../style/style"

import useSignOut from "../../../hooks/useSignOut"

export default function UserLogged({ menuActive }: { menuActive: string }) {
	const [signOut] = useSignOut()
	const Navigate = useNavigate()

	return (
		<View style={{ display: "flex", flexDirection: "row" }}>
			<TouchableOpacity style={menuSelectStyle("repositories", menuActive)} onPress={() => Navigate("/")}>
				<Text style={menuSelectTextStyle("repositories", menuActive)}>Repositories</Text>
			</TouchableOpacity>
			<TouchableOpacity style={menuSelectStyle("createReview", menuActive)} onPress={() => Navigate("/repository/create")}>
				<Text style={menuSelectTextStyle("createReview", menuActive)}>Create Review</Text>
			</TouchableOpacity>
			<TouchableOpacity style={menuSelectStyle("myReviews", menuActive)} onPress={() => Navigate("/me/reviews")}>
				<Text style={menuSelectTextStyle("myReviews", menuActive)}>MyReviews</Text>
			</TouchableOpacity>
			<TouchableOpacity style={menuSelectStyle("signout", menuActive)} onPress={() => signOut(Navigate)}>
				<Text style={menuSelectTextStyle("signout", menuActive)}>SignOut</Text>
			</TouchableOpacity>
		</View>
	)
}
