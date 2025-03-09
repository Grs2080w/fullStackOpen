import { render, screen, fireEvent, waitFor, userEvent } from "@testing-library/react-native"
import Index from "./Components/Index"

describe("SignIn", () => {
	describe("SignInContainer", () => {
		it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
			const onSubmit = jest.fn()

			render(<Index onSubmit={onSubmit} />)

			const user = userEvent.setup()

			let button = screen.getByText("Sign in")

			// Usando a função auxiliar
			await waitFor(async () => {
				await user.type(screen.getByPlaceholderText("Username"), "kalle")
				await user.type(screen.getByPlaceholderText("Password"), "password")
			})

			await waitFor(async () => {
				await user.press(button)
			})

			await waitFor(() => {
				expect(onSubmit).toHaveBeenCalledTimes(1)
			})
		}, 10000)
	})
})
