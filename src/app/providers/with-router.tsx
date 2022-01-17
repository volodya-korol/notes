import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import loaderImg from "shared/assets/image/mainLoader.svg";

const Loader = () => {
	return (
		<div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
			<img src={loaderImg} width={250} alt="loader" />
		</div>
	);
};

export const withRouter = (Component: () => React.ReactNode) => () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<Loader />}>{Component()}</Suspense>
		</BrowserRouter>
	);
};
