import { View, Dimensions, FlatList, Text, VirtualizedList, ScrollView } from "react-native"
import { useParams } from "react-router-native"

import { useQuery } from "@apollo/client"
import { QUERY_REPOSITORY, QUERY_REVIEWS } from "../../graphql/queries"

// Components
import AppBar from "../AppBar/Index"
import RepositoryItem from "../Repository_List_View/components/RepositoryItem/Index"
import Loader from "../Loader/Index"
import Review from "../Review/Index"

export default function Repository() {
	const { id } = useParams()

	const { data: dataRepository, loading } = useQuery(QUERY_REPOSITORY, {
		variables: { repositoryId2: id },
	})

	const { data: dataReviews } = useQuery(QUERY_REVIEWS, {
		fetchPolicy: "cache-and-network",
		variables: { repositoryId3: id },
	})

	const reviewsEdge = dataReviews ? dataReviews?.repository?.reviews?.edges.map((edge: any) => edge.node) : []

	if (loading) return <Loader />

	return (
		<ScrollView>
			<View>
				<AppBar menuActive="repositoryItem" />
				<View>
					<RepositoryItem key={dataRepository?.repository?.id} repository={dataRepository?.repository} />
				</View>

				<View style={{ marginTop: 20 }}>
					{reviewsEdge.map((review: any) => {
						return <Review key={review.id} review={review} />
					})}
				</View>
			</View>
		</ScrollView>
	)
}
