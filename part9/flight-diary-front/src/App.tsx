import { useState, useEffect } from "react"
import { diarie } from "./types/types"
import { getAll } from "./services/diariesServices"

//Components
import AddForm from "./components/AddForm"
import DiariesEntry from "./components/DiariesEntry"

function App() {
	const [diaries, setDiaries] = useState<diarie[]>()

	useEffect(() => {
		getAll().then((res) => setDiaries(res.data))
	}, [])

	return (
		<div>
			<AddForm diaries={diaries!} setDiaries={setDiaries!} />
			<h1>Diary Entries</h1>
			<DiariesEntry diaries={diaries!} />
		</div>
	)
}

export default App
