import { View, FlatList } from "react-native"

// Graphql
import { useQuery } from "@apollo/client"
import { QUERY_MY_REVIEWS } from "../../graphql/queries"

// Components
import AppBar from "../AppBar/Index"
import Loader from "../Loader/Index"
import Review from "../Review/Index"

export default function MyReviews() {
	const { data, loading } = useQuery(QUERY_MY_REVIEWS)
	const reviews = data?.me?.reviews.edges.map((edge: any) => edge.node)

	if (loading && !data) return <Loader />

	return (
		<View>
			<FlatList ListHeaderComponent={<AppBar menuActive="myReviews" />} data={reviews} renderItem={({ item }) => <Review review={item} my={true} />} />
		</View>
	)
}
