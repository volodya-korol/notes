import React from "react";
import { Route, Routes } from "react-router-dom";

const Notes = React.lazy(() => import("./Notes"));

export const Routing = () => {
	return (
		<Routes>
			<Route path="/" element={<Notes />} />
		</Routes>
	);
};
