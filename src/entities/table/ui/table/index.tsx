import React, { ReactNode } from "react";
import s from "./styles.module.scss";

type PropsT = {
	title: string[];
	rows: ReactNode;
	actions?: ReactNode;
};

export const Table = ({ title, rows, actions = null }: PropsT) => {
	return (
		<table className={s.table}>
			<thead>
				<tr>
					<th></th>
					{title.map((m, i) => (
						<th key={i}>{m}</th>
					))}
					{actions && <th>{actions}</th>}
				</tr>
			</thead>
			<tbody className={s.tbody}>{rows || []}</tbody>
		</table>
	);
};
