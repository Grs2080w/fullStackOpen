import { Routes, Route, Navigate } from "react-router-native"

// Components
import SignUp from "../components/SignUp/Index"
import SignIn from "../components/SignIn/Index"
import MeReviews from "../components/MyReviews/Index"
import Repository from "../components/Repository_Single_view/Index"
import CreateReview from "../components/CreateReview/Index"
import RepositoryList from "../components/Repository_List_View/Index"

export default function MainRouter() {
	return (
		<Routes>
			<Route path="/repository/create" element={<CreateReview />} />
			<Route path="/repository/:id" element={<Repository />} />
			<Route path="*" element={<Navigate to="/" replace />} />
			<Route path="/me/reviews" element={<MeReviews />} />
			<Route path="/" element={<RepositoryList />} />
			<Route path="/signin" element={<SignIn />} />
			<Route path="/signup" element={<SignUp />} />
		</Routes>
	)
}
