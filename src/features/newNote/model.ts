import { notesApi } from "./../../shared/api/notes/index";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const CreateNoteAsync = createAsyncThunk(
	"profile/create-note",
	async (
		{ name, category, content, date }: { name: string; category: string; content: string; date: string },
		thunkAPI
	) => {
		try {
			const data = notesApi.createNote(name, category, content, date);
			return data;
		} catch (error) {
			console.log(error);
		}
	}
);
