import { diarie } from "../types/types"

interface Props {
	diaries: diarie[]
}

function DiariesEntry({ diaries }: Props) {
	return diaries?.map((diarie) => {
		return (
			<div key={diarie.id}>
				<h3>{diarie.date}</h3>
				<p>
					Visibility: {diarie.visibility} <br />
					Weather: {diarie.weather}
				</p>
			</div>
		)
	})
}

export default DiariesEntry
