import { View, Button, Alert } from "react-native"
import { useNavigate } from "react-router-native"

// Style
import style from "../styles/styles"

// Graphql
import { useMutation } from "@apollo/client"
import { DELETE_REVIEW } from "../../../graphql/mutations"
import { QUERY_MY_REVIEWS } from "../../../graphql/queries"

export default function User_Reviews({ review }: any) {
	const navigate = useNavigate()
	const [deleteReview] = useMutation(DELETE_REVIEW, { refetchQueries: [QUERY_MY_REVIEWS] })

	const createTwoButtonAlert = () =>
		Alert.alert("Delete", "Are you sure to delete this Review?", [
			{
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			},
			{ text: "OK", onPress: () => deleteReview({ variables: { deleteReviewId: review.id } }) },
		])

	return (
		<View style={style.secondView}>
			<Button color="blue" title="View Repository" onPress={() => navigate(`/repository/${review.repository.id}`)} />
			<Button
				color="red"
				title="Delete"
				onPress={() => {
					createTwoButtonAlert()
				}}
			/>
		</View>
	)
}
