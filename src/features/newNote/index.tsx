import { NoteModal } from "entities/noteModal";
import React from "react";
import { useAppDispatch } from "shared/hooks";
import { CreateNoteAsync } from "./model";

export const NewNote = () => {
	const dispatch = useAppDispatch();
	return (
		<NoteModal
			onSubmit={({ category, content, date, name }) => {
				dispatch(CreateNoteAsync({ category, content, name, date }));
			}}
			trigger={<button>Create new</button>}
		/>
	);
};
