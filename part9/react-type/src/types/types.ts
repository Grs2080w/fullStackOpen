interface CoursePartBase {
	name: string
	exerciseCount: number
}

interface courseDescription extends CoursePartBase {
	description: string
}

interface CoursePartGroup extends CoursePartBase {
	groupProjectCount: number
	kind: "group"
}

interface CoursePartBasic extends courseDescription {
	kind: "basic"
}

interface CoursePartBackground extends courseDescription {
	backgroundMaterial: string
	kind: "background"
}

interface CoursePartSpecial extends courseDescription {
	kind: "special"
	requirements: string[]
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial

export default CoursePart
