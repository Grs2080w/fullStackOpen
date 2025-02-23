import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom"

// Components
import PatientListPage from "./components/PatientListPage"
import PatientComponent from "./components/PatientComponent"

// Services
import { Patient } from "./services/types"
import { getAll } from "./services/patients"

// Styles
import { Button, Divider, Container, Typography } from "@mui/material"

const App = () => {
	const [patients, setPatients] = useState<Patient[]>([])

	useEffect(() => {
		const fetchPatientList = async () => {
			const patients = await getAll()
			setPatients(patients)
		}
		void fetchPatientList()
	}, [])

	return (
		<div className="App">
			<Router>
				<Container>
					<Typography variant="h3" style={{ marginBottom: "0.5em" }}>
						Patientor
					</Typography>

					<Button component={Link} to="/" variant="contained" color="primary">
						Home
					</Button>

					<Divider hidden />

					<Routes>
						<Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
						<Route path="/:id" element={<PatientComponent />} />
					</Routes>
				</Container>
			</Router>
		</div>
	)
}

export default App
