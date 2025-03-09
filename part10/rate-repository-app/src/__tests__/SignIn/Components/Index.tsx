import { TextInput, ScrollView, View, Button, StyleSheet, Text, Dimensions, Platform } from "react-native"

// Forms
import { Formik } from "formik"
import * as Yup from "yup"

const validateSchema = Yup.object().shape({
	username: Yup.string().required("Username is required").min(1, "Username must be at least 1 character").max(20, "Username must be at most 20 characters"),
	password: Yup.string().required("Password is required").min(5, "Password must be at least 5 characters"),
})

const FormInput = ({ onSubmit }: { onSubmit: () => void }) => {
	return (
		<Formik
			initialValues={{
				username: "",
				password: "",
			}}
			validationSchema={validateSchema}
			onSubmit={(values) => onSubmit()}
		>
			{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
				<View>
					<TextInput onChangeText={handleChange("username")} id="username" placeholder="Username" />

					{touched.username && errors.username && <Text>{errors.username}</Text>}

					<TextInput onChangeText={handleChange("password")} id="password" secureTextEntry placeholder="Password" />

					{touched.password && errors.password && <Text>{errors.password}</Text>}

					<Text style={{ marginTop: 15 }}>
						<Button color="blue" title="Sign in" onPress={() => handleSubmit()} />
					</Text>
				</View>
			)}
		</Formik>
	)
}

const Index = ({ onSubmit }: { onSubmit: () => void }) => {
	return (
		<ScrollView style={{ width: Dimensions.get("window").width + 1 }}>
			<FormInput onSubmit={onSubmit} />
		</ScrollView>
	)
}

export default Index
