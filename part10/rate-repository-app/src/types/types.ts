interface Repository {
	id: String
	fullName: String
	description: String
	language: string
	forksCount: number
	stargazersCount: number
	ratingAverage: number
	reviewCount: number
	ownerAvatarUrl: string
	url?: string
}

interface Order {
	orderBy: "CREATED_AT" | "RATING_AVERAGE"
	orderDirection: "ASC" | "DESC"
	searchKeyword: string
}

export { Repository, Order }
