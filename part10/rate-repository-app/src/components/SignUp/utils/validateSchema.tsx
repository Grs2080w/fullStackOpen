import * as Yup from "yup"

const validateSchema = Yup.object().shape({
	username: Yup.string().required("Username is required").min(1, "Username must be at least 1 character").max(20, "Username must be at most 20 characters"),
	password: Yup.string().required("Password is required").min(5, "Password must be at least 5 characters"),
	passwordConfirmation: Yup.string()
		.oneOf([Yup.ref("password")], "Passwords must match")
		.required("Password confirmation is required"),
})

export default validateSchema
