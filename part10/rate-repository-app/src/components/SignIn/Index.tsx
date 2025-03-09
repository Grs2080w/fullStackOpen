import { TextInput, ScrollView, View, Button, Text } from "react-native"
import { useNavigate } from "react-router-native"
import { useState } from "react"
import { HelperText, MD2Colors } from "react-native-paper"

// Forms
import { Formik } from "formik"
import validateSchema from "./utils/validationSchema"
import onSubmitSignIn from "./utils/onSubmitSignIn"

// Hooks
import useSignIn from "../../hooks/useSignIn"
import useScreenWidth from "../../hooks/useScreenWidth"

// Components
import AppBar from "../AppBar/Index"
import Notification from "../Notification/Index"

// Styles
import styles from "./styles/styles"

interface Values {
	username: string
	password: string
}

const FormInput = ({ setNotification }: { setNotification: React.Dispatch<React.SetStateAction<string>> }) => {
	const [signIn] = useSignIn()
	const Navigate = useNavigate()

	const onSubmit = async (values: Values) => {
		onSubmitSignIn({ values, signIn, Navigate, setNotification })
	}

	return (
		<Formik
			initialValues={{
				username: "",
				password: "",
			}}
			validationSchema={validateSchema}
			onSubmit={(values) => onSubmit(values)}
		>
			{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
				<View style={styles.viewFrom}>
					<TextInput onChangeText={handleChange("username")} id="username" placeholder="Username" style={touched.username && errors.username ? { ...styles.input, borderColor: "red" } : styles.input} />

					<HelperText style={{ color: MD2Colors.red600, lineHeight: 10 }} type="error" visible={!!touched.password && !!errors.username}>
						{errors.username}
					</HelperText>

					<TextInput onChangeText={handleChange("password")} id="password" secureTextEntry placeholder="Password" style={touched.password && errors.password ? { ...styles.input, borderColor: "red" } : styles.input} />

					<HelperText style={{ color: MD2Colors.red600, lineHeight: 10 }} type="error" visible={!!touched.password && !!errors.password}>
						{errors.password}
					</HelperText>

					<Text style={{ marginTop: 15 }}>
						<Button color="blue" title="Sign in" onPress={() => handleSubmit()} />
					</Text>
				</View>
			)}
		</Formik>
	)
}

const SignIn = () => {
	const screenWidth = useScreenWidth()
	const [notification, setNotification] = useState(" ")

	return (
		<ScrollView style={{ width: screenWidth }}>
			<AppBar menuActive="signin" />
			<Notification notification={notification} setNotification={setNotification} />
			<FormInput setNotification={setNotification} />
		</ScrollView>
	)
}

export default SignIn
