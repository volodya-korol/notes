import { Routing } from "pages";
import "./index.scss";
import { withProviders } from "./providers";

const App = () => {
	return (
		<div className="app">
			<Routing />
		</div>
	);
};

export default withProviders(App);
