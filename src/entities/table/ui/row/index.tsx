import React, { ReactNode } from "react";
import { iconResolver } from "shared/lib";

type PropsT = {
	category: string;
	rows: ReactNode[];
	rightContent?: ReactNode;
};

export const Row = ({ rows, rightContent = null, category }: PropsT) => {
	return (
		<tr>
			<th>{iconResolver(category)}</th>
			{rows.map((m, i) => (
				<th style={{ fontWeight: i === 0 ? 600 : "inherit" }} key={i}>
					{m}
				</th>
			))}
			{rightContent && <th>{rightContent}</th>}
		</tr>
	);
};
