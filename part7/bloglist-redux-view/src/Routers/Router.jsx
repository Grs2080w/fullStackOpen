import { Route, Routes } from "react-router"

// Components
import App from "../App"
import Users from "../components/Users"
import IndividualUserView from "../components/IndividualUserView"
import BlogView from "../components/BlogView"

export default function Router() {
	return (
		<div className="m-5">
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="/users" element={<Users />} />
				<Route path="/users/:id" element={<IndividualUserView />} />
				<Route path="/blogs/:id" element={<BlogView />} />
			</Routes>
		</div>
	)
}
