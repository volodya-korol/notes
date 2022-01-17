import { setupStore } from "app/store";
import { Provider } from "react-redux";

export const withReduxPrivider = (Component: () => React.ReactNode) => () => {
	const store = setupStore();
	return <Provider store={store}>{Component()}</Provider>;
};
