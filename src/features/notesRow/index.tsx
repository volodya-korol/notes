import { DeleteOutlined, DownloadOutlined, EditOutlined } from "@ant-design/icons";
import { NoteModal } from "entities/noteModal";
import { notesSlice } from "entities/notes";
import { Row } from "entities/table/ui/row";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { Note } from "shared/api/notes/types";
import { DeleteNoteAsync, EditNoteAsync } from "./model";
import s from "./styles.module.scss";

type PropsT = {
	note: Note;
	isArchived?: boolean;
};

export const NotesRow = memo(({ note, isArchived = false }: PropsT) => {
	const dispatch = useDispatch();
	const { archived, unArchived,deleteArchivedNote } = notesSlice.actions;
	const { category, content, created, date, id, name } = note;

	return (
		<Row
			category={note.category}
			rows={[name, created, category, content, date]}
			rightContent={
				<div className={s.icons}>
					<NoteModal
						defaultValues={{ category, content, date, name }}
						onSubmit={({ category, content, date, name }) => {
							if (category === "task" || category === "idea" || category === "quote" || category === "random thought") {
								dispatch(EditNoteAsync({ category, content, name, date, id }));
							}
						}}
						trigger={<EditOutlined />}
					/>
					<div>
						<DeleteOutlined
							onClick={() => {
								if (isArchived) {
									dispatch(deleteArchivedNote({ id: note.id }));
								} else {
									dispatch(DeleteNoteAsync({ id: note.id }));
								}

							}}
						/>
					</div>
					<div>
						<DownloadOutlined
							style={{ transform: `rotate(${isArchived ? "180deg" : "0"})` }}
							onClick={() => {
								if (isArchived) {
									dispatch(unArchived({ id: note.id }));
								} else {
									dispatch(archived({ id: note.id }));
								}
							}}
						/>
					</div>
				</div>
			}
		/>
	);
});
