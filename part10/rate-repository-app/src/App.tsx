import { View } from "react-native"
import { NativeRouter, Routes, Route, Navigate } from "react-router-native"

import RepositoryList from "./components/RepositoryList"
import SignIn from "./components/SignIn"
 

export default function App() {
	return (
		<View>
			<NativeRouter>
				<Routes>
					<Route path="/" element={<RepositoryList />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</NativeRouter>
		</View>
	)
}
