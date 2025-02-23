import { addDiarie } from "../services/diariesServices"
import { diarie } from "../types/types"
import { isAxiosError } from "axios"

// Components
import VisibilityForm from "./Form/VisibilityForm"
import WeatherForm from "./Form/WeatherForm"
import CommentForm from "./Form/CommentForm"
import DateForm from "./Form/DateForm"

interface Props {
	diaries: diarie[]
	setDiaries: React.Dispatch<React.SetStateAction<diarie[] | undefined>>
}

function AddForm({ diaries, setDiaries }: Props) {
	function submitDatas(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const newDiarie = {
			date: e.currentTarget.date.value,
			weather: e.currentTarget.weather.value,
			visibility: e.currentTarget.visibility.value,
			comment: e.currentTarget.comment.value,
		}

		try {
			addDiarie(newDiarie).then((res) => {
				setDiaries(diaries?.concat(res.data))
			})
		} catch (error) {
			if (isAxiosError(error)) {
				console.log(error.message)
			} else if (error) {
				console.log(error)
			}
		}
	}

	return (
		<div>
			<h1>Add new Entry</h1>
			<form onSubmit={submitDatas}>
				<DateForm />
				<VisibilityForm />
				<WeatherForm />
				<CommentForm />

				<button type="submit">add</button>
			</form>
		</div>
	)
}

export default AddForm
