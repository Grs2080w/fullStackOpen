import { TextInput, View, Text, Button } from "react-native"
import { useNavigate } from "react-router-native"
import { Formik } from "formik"

// Graphql
import { useMutation, useQuery } from "@apollo/client"
import { QUERY_ME } from "../../../graphql/queries"
import { CREATE_REVIEW } from "../../../graphql/mutations"

// Style
import { stylesCreateReview } from "../style/styles"

// Utils
import onSubmitCreateReview from "../utils/onSubmitCreateReview"
import validateSchema from "../utils/validationSchema"

// Validation
import { ZodError } from "zod"

export default function FormInputCreateReview({ setNotification }: { setNotification: React.Dispatch<React.SetStateAction<string>> }) {
	const [createReview] = useMutation(CREATE_REVIEW)
	const { data } = useQuery(QUERY_ME)

	const Navigate = useNavigate()

	const validation_And_onSubmit = async (values: any) => {
		try {
			validateSchema.parse(values)
			onSubmitCreateReview({ values, createReview, data, Navigate, setNotification })
		} catch (error) {
			error instanceof ZodError && setNotification(error.errors[0].message)
		}
	}

	return (
		<Formik
			initialValues={{
				ownerName: "",
				repositoryName: "",
				rating: "",
				text: "",
			}}
			onSubmit={(values) => {
				validation_And_onSubmit(values)
			}}
		>
			{({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
				<View style={stylesCreateReview.viewFrom}>
					<TextInput onChangeText={handleChange("ownerName")} id="ownerName" placeholder="Repository Owner Name" style={touched.ownerName && errors.ownerName ? { ...stylesCreateReview.input, borderColor: "red" } : stylesCreateReview.input} />

					{touched.ownerName && errors.ownerName && <Text style={stylesCreateReview.noti}>{errors.ownerName}</Text>}

					<TextInput onChangeText={handleChange("repositoryName")} id="repositoryName" placeholder="Repository Name" style={touched.repositoryName && errors.repositoryName ? { ...stylesCreateReview.input, borderColor: "red" } : stylesCreateReview.input} />

					{touched.repositoryName && errors.repositoryName && <Text style={stylesCreateReview.noti}>{errors.repositoryName}</Text>}

					<TextInput onChangeText={handleChange("rating")} id="rating" placeholder="Rating Betwen 0 and 100" style={touched.rating && errors.rating ? { ...stylesCreateReview.input, borderColor: "red" } : stylesCreateReview.input} />

					{touched.rating && errors.rating && <Text style={stylesCreateReview.noti}>{errors.rating}</Text>}

					<TextInput onChangeText={handleChange("text")} id="text" multiline placeholder="Review" style={touched.text && errors.text ? { ...stylesCreateReview.input, borderColor: "red" } : stylesCreateReview.input} />

					{touched.text && errors.text && <Text style={stylesCreateReview.noti}>{errors.text}</Text>}

					<Text style={stylesCreateReview.button}>
						<Button color="red" title="Create" onPress={() => handleSubmit()} />
					</Text>
				</View>
			)}
		</Formik>
	)
}
