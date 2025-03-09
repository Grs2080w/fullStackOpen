import { View, Text } from "react-native"
import style from "../styles/styles"
import useScreenWidth from "@/src/hooks/useScreenWidth"
import DateObject from "react-date-object"

export default function Repository_Reviews({ review, my }: any) {
	const screenWidth = useScreenWidth()
	let dateTime = new DateObject(review.createdAt.slice(0, 10))

	return (
		<View style={style.main}>
			<View style={style.rating}>
				<View style={[style.ratingNumber, { width: screenWidth * 0.12, height: screenWidth * 0.12 }]}>
					<Text style={{ color: "blue" }}>{review?.rating}</Text>
				</View>
			</View>
			<View style={{ width: "80%" }}>
				<View>
					<Text style={style.username}>{my ? review?.repository?.fullName : review?.user.username}</Text>
				</View>
				<View>
					<Text style={style.data}>{dateTime.format("DD/MM/YYYY")}</Text>
				</View>
				<View>
					<Text style={style.text}>{review.text}</Text>
				</View>
			</View>
		</View>
	)
}
