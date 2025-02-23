function WeatherForm() {
	return (
		<div>
			<label htmlFor="weather">
				<b>Weather</b>
			</label>
			<input type="radio" value="sunny" name="weather" id="" /> sunny
			<input type="radio" value="rainy" name="weather" id="" /> rainy
			<input type="radio" value="stormy" name="weather" id="" /> stormy
			<input type="radio" value="windy" name="weather" id="" /> windy
			<input type="radio" value="cloudy" name="weather" id="" /> cloudy
		</div>
	)
}

export default WeatherForm
