import ReactDOM from "react-dom/client"
import Router from "./Routers/Router"

import { Provider } from "react-redux"
import { store } from "./Store/Store"

import { BrowserRouter } from "react-router"

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<BrowserRouter>
			<Router />
		</BrowserRouter>
	</Provider>
)
