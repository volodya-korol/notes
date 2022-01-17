import { compose } from "@reduxjs/toolkit";
import { withReduxPrivider } from "./with-redux-privider";
import { withRouter } from "./with-router";

export const withProviders = compose(withRouter,withReduxPrivider);