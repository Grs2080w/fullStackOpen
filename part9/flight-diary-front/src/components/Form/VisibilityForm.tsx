function VisibilityForm() {
	return (
		<div>
			<label htmlFor="visibility">
				<b>Visibility</b>
			</label>
			<input type="radio" value="great" name="visibility" id="" /> great
			<input type="radio" value="good" name="visibility" id="" /> good
			<input type="radio" value="ok" name="visibility" id="" /> ok
			<input type="radio" value="poor" name="visibility" id="" /> poor
		</div>
	)
}

export default VisibilityForm
