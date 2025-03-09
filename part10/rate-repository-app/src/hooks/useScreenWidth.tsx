import { useState, useEffect } from "react"
import { Dimensions } from "react-native"

/**
 * useScreenWidth
 *
 * @description
 * This is a custom hook that provides the current screen width of the device.
 * It listens for changes in the device's dimensions and updates the screen width accordingly.
 * This can be useful for responsive design, where components need to adjust based on the screen size.
 *
 * @returns {number} The current width of the device's screen.
 *
 * @example
 * const screenWidth = useScreenWidth();
 * // use screenWidth to set component styles or layout dynamically
 */

export default function useScreenWidth() {
	const [screenWidth, setScreenWidth] = useState(Dimensions.get("window").width)

	useEffect(() => {
		const updateWidth = () => setScreenWidth(Dimensions.get("window").width)
		const subscription = Dimensions.addEventListener("change", updateWidth)

		return () => subscription?.remove()
	}, [])

	return screenWidth
}
