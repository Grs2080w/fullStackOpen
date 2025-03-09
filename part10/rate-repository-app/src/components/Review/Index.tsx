import { View } from "react-native"

// Components
import User_Reviews from "./components/User_Reviews"
import Repository_Reviews from "./components/Repository_Review"

export default function Review({ review, my = false }: any) {
	return (
		<View>
			<Repository_Reviews review={review} my={my} />
			{my && <User_Reviews review={review} />}
		</View>
	)
}
