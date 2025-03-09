import { View, Text, TouchableOpacity } from "react-native"

import { useNavigate } from "react-router-native"
import { menuSelectTextStyle, menuSelectStyle } from "../style/style"

export default function UserNotLooged({ menuActive }: { menuActive: string }) {
	const Navigate = useNavigate()

	return (
		<View style={{ display: "flex", flexDirection: "row" }}>
			<TouchableOpacity style={menuSelectStyle("repositories", menuActive)} onPress={() => Navigate("/")}>
				<Text style={menuSelectTextStyle("repositories", menuActive)}>Repositories</Text>
			</TouchableOpacity>
			<TouchableOpacity style={menuSelectStyle("signin", menuActive)} onPress={() => Navigate("/signin")}>
				<Text style={menuSelectTextStyle("signin", menuActive)}>SignIn</Text>
			</TouchableOpacity>
			<TouchableOpacity style={menuSelectStyle("signup", menuActive)} onPress={() => Navigate("/signup")}>
				<Text style={menuSelectTextStyle("signup", menuActive)}>SignUp</Text>
			</TouchableOpacity>
		</View>
	)
}
