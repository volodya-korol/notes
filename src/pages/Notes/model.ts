import { createAsyncThunk } from "@reduxjs/toolkit";
import { notesApi } from "shared/api/notes";

export const GetAllNotes = createAsyncThunk("notes/get-all-notes", async (_, thunkAPI) => {
	try {
		const data = await notesApi.getNotes();
		return data;
	} catch (error) {
		console.log(error);
	}
});

export const GetStats = createAsyncThunk("notes/get-stats", async (_, thunkAPI) => {
	try {
		const data = await notesApi.getStats();
		return data;
	} catch (error) {
		console.log(error);
	}
});
