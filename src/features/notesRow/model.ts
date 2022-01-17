import { createAsyncThunk } from "@reduxjs/toolkit";
import { notesApi } from "shared/api";
import { Note } from "shared/api/notes/types";

export const DeleteNoteAsync = createAsyncThunk("notes/delete", async ({ id }: { id: string }) => {
	try {
		const data = await notesApi.deleteNote(id);
		return data;
	} catch (error) {
		console.log(error);
	}
});
export const EditNoteAsync = createAsyncThunk(
	"notes/edit",
	async ({
		id,
		name,
		category,
		content,
		date,
	}: {
		id: string;
		name: string;
		category: Note["category"];
		content: string;
		date: string;
	}) => {
		try {
			const data = await notesApi.editNote({ id, name, content, category, date });
			return data;
		} catch (error) {
			console.log(error);
		}
	}
);
