import { TextInput, ScrollView, View, Button, StyleSheet, Text, Dimensions, Platform } from "react-native"
import { Formik } from "formik"
import AppBar from "./AppBar"
import * as Yup from "yup"

const validateSchema = Yup.object().shape({
	username: Yup.string().required("Username is required").min(1, "Username must be at least 1 character").max(20, "Username must be at most 20 characters"),
	password: Yup.string().required("Password is required").min(5, "Password must be at least 5 characters"),
})

const FormInput = () => {
	return (
		<Formik
			initialValues={{
				username: "",
				password: "",
			}}
			validationSchema={validateSchema}
			onSubmit={(values) => {
				console.log(values)
			}}
		>
			{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
				<View style={styles.viewFrom}>
					<TextInput onChangeText={handleChange("username")} id="username" placeholder="Username" style={touched.username && errors.username ? { ...styles.input, borderColor: "red" } : styles.input} />

					{touched.username && errors.username && <Text style={styles.noti}>{errors.username}</Text>}

					<TextInput onChangeText={handleChange("password")} id="password" secureTextEntry placeholder="Password" style={touched.password && errors.password ? { ...styles.input, borderColor: "red" } : styles.input} />

					{touched.password && errors.password && <Text style={styles.noti}>{errors.password}</Text>}

					<Text style={{ marginTop: 15 }}>
						<Button color="blue" title="Sign in" onPress={handleSubmit} />
					</Text>
				</View>
			)}
		</Formik>
	)
}

const SignIn = () => {
	return (
		<ScrollView style={{ width: Dimensions.get("window").width + 1 }}>
			<AppBar />
			<FormInput />
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	viewFrom: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",

		borderRadius: 5,
		borderColor: "lightgray",
		borderWidth: 1,
		backgroundColor: "white",
		padding: 10,
		margin: 10,

		fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
	},
	input: {
		borderWidth: 1,
		borderRadius: 5,
		borderColor: "lightgray",

		width: 300,
		padding: 10,
		marginVertical: 5,
		backgroundColor: "white",

		fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
	},
	noti: {
		color: "red",
		fontWeight: "bold",
		marginBottom: 5,
		backgroundColor: "white",
		padding: 2,
		borderRadius: 5,

		fontFamily: Platform.OS === "android" ? "Roboto" : "Arial",
	},
})

export default SignIn
