interface Props {
	name: string
}

function Header({ name: courseName }: Props) {
	return <h1>{courseName}</h1>
}

export default Header
