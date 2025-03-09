import { View, TextInput, Text, Button } from "react-native"

import { useNavigate } from "react-router-native"
import { HelperText } from "react-native-paper"

// Form
import { Formik } from "formik"
import validateSchema from "./utils/validateSchema"

// Graphql
import { useMutation } from "@apollo/client"
import { CREATE_NEW_USER } from "../../graphql/mutations"

// Styles
import styles from "./style/styles"

// Hooks
import useSignIn from "../../hooks/useSignIn"

// Utils
import onSubmitSignUp from "./utils/onSubmitSignUp"


export default function FormSignUp({ setNotification }: { setNotification: React.Dispatch<React.SetStateAction<string>> }) {
	const [createNewUser] = useMutation(CREATE_NEW_USER)
	const [signIn] = useSignIn()
	const Navigate = useNavigate()

	function onSubmit(values: any) {
		onSubmitSignUp({ values, createNewUser, signIn, Navigate, setNotification })
	}

	return (
		<Formik
			initialValues={{
				username: "",
				password: "",
				passwordConfirmation: "",
			}}
			validationSchema={validateSchema}
			onSubmit={(values) => onSubmit(values)}
		>
			{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
				<View style={styles.viewFrom}>
					<TextInput onChangeText={handleChange("username")} id="username" placeholder="Username" style={touched.username && errors.username ? { ...styles.input, borderColor: "red" } : styles.input} />

					<HelperText style={styles.noti} type="error" visible={!!touched.username && !!errors.username}>
						{errors.username}
					</HelperText>

					<TextInput onChangeText={handleChange("password")} id="password" placeholder="Password" style={touched.password && errors.password ? { ...styles.input, borderColor: "red" } : styles.input} />

					<HelperText style={styles.noti} type="error" visible={!!touched.password && !!errors.password}>
						{errors.password}
					</HelperText>

					<TextInput onChangeText={handleChange("passwordConfirmation")} id="passwordConfirmation" placeholder="Password Confirmation" style={touched.passwordConfirmation && errors.passwordConfirmation ? { ...styles.input, borderColor: "red" } : styles.input} />

					<HelperText style={styles.noti} type="error" visible={!!touched.passwordConfirmation && !!errors.passwordConfirmation}>
						{errors.passwordConfirmation}
					</HelperText>

					<Text style={styles.button}>
						<Button color="lightgreen" title="Create" onPress={() => handleSubmit()} />
					</Text>
				</View>
			)}
		</Formik>
	)
}
