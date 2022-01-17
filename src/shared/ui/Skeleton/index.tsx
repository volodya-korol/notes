import React, { memo } from "react";
import s from "./styles.module.scss";

type Props = React.HTMLAttributes<HTMLDivElement> & {
	loading?: boolean;
	count?: number;
	children?: React.ReactNode;
};

function Skeleton({ loading = true, children, count = 1, ...props }: Props) {
	const loadList = [...Array(count)].map((m, i) => (
		<div {...props} key={i} className={`${s.load} ${props.className}`}></div>
	));
	return loading ? <>{loadList}</> : <>{children}</>;
}

export default memo(Skeleton);
