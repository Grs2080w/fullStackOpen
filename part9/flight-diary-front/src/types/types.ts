export enum Weather {
	Sunny = "sunny",
	Rainy = "rainy",
	Cloudy = "cloudy",
	Stormy = "stormy",
	Windy = "windy",
}

export enum Visibility {
	Great = "great",
	Good = "good",
	Ok = "ok",
	Poor = "poor",
}

export interface diarie {
	id: number
	date: string
	weather: Weather
	visibility: Visibility
}

export type newDiarie = Omit<diarie, "id">
