import { NavigateFunction } from "react-router-native"
import { MutationFunctionOptions, OperationVariables, DefaultContext, ApolloCache, ApolloError } from "@apollo/client"

interface Params {
	createReview: (options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>> | undefined) => Promise<any>
	values: {
		ownerName: string
		repositoryName: string
		rating: number
		text: string
	}
	data: any
	Navigate: NavigateFunction
	setNotification: React.Dispatch<React.SetStateAction<string>>
}

const onSubmitCreateReview = async ({ values, createReview, data, Navigate, setNotification }: Params) => {
	if (data.me === null) {
		Navigate("/signin/create")
	} else {
		try {
			await createReview({
				variables: {
					review: {
						ownerName: values.ownerName,
						repositoryName: values.repositoryName,
						rating: Number(values.rating),
						text: values.text,
					},
				},
			})

			Navigate("/")
		} catch (e) {
			e instanceof ApolloError && setNotification(e.message)
		}
	}
}

export default onSubmitCreateReview
