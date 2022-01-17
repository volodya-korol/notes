import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { notesSlice } from "entities/notes";
import { Table } from "entities/table/ui/table";
import React, { ReactNode } from "react";
import { useDispatch } from "react-redux";

type PropsT = {
	rows: ReactNode;
	isArchived?: boolean;
};

export const NotesTable = ({ rows, isArchived = false }: PropsT) => {
	const dispatch = useDispatch();
	const { archivedAll, deleteArchivedAll, deleteNotesAll, unArchivedAll } = notesSlice.actions;
	
	return (
		<Table
			title={["Name", "Created", "Category", "Content", "Dates"]}
			rows={rows}
			actions={
				<div style={{ fontSize: 18 }}>
					{isArchived ? (
						<DeleteOutlined
							style={{ paddingRight: 10 }}
							onClick={() => {
								dispatch(deleteArchivedAll());
							}}
						/>
					) : (
						<DeleteOutlined
							style={{ paddingRight: 10 }}
							onClick={() => {
								dispatch(deleteNotesAll());
							}}
						/>
					)}

					{isArchived ? (
						<DownloadOutlined
							style={{ transform: "rotate(180deg)" }}
							onClick={() => {
								dispatch(unArchivedAll());
							}}
						/>
					) : (
						<DownloadOutlined
							onClick={() => {
								dispatch(archivedAll());
							}}
						/>
					)}
				</div>
			}
		/>
	);
};
