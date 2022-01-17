import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

import { CreateNoteAsync } from "features/newNote/model";
import { DeleteNoteAsync, EditNoteAsync } from "features/notesRow/model";
import { GetAllNotes, GetStats } from "pages/Notes/model";
import { Note, Notes, NotesStats } from "shared/api/notes/types";

const initialState = {
	notes: [] as Notes,
	archivedNotes: [] as Notes,
	stats: {} as NotesStats,
};

export const notesSlice = createSlice({
	name: "notesSlice",
	initialState: initialState,
	reducers: {
		deleteArchivedNote: (state, action: PayloadAction<{ id: string }>) => {
			const { id } = action.payload;
			const archivedNotes = current(state.archivedNotes);

			archivedNotes.forEach((note, i) => {
				if (note.id === id) state.archivedNotes.splice(i, 1);
			});
		},
		deleteArchivedAll: (state) => {
			state.archivedNotes = [];
		},
		deleteNotesAll: (state) => {
			state.notes = [];
			state.stats = initialState.stats;
		},

		archivedAll: (state) => {
			state.archivedNotes.push(...current(state.notes));
			state.notes = [];
		},
		unArchivedAll: (state) => {
			state.notes.push(...current(state.archivedNotes));
			state.archivedNotes = [];
		},
		archived: (state, action: PayloadAction<{ id: string }>) => {
			const { id } = action.payload;
			const notes = current(state.notes);
			const note = notes.find((note) => note.id === id);

			if (note) {
				notes.forEach((note, i) => {
					if (note.id === id) state.notes.splice(i, 1);
				});
				state.archivedNotes.push(note);
			}
		},
		unArchived: (state, action: PayloadAction<{ id: string }>) => {
			const { id } = action.payload;
			const archivedNotes = current(state.archivedNotes);
			const note = archivedNotes.find((note) => note.id === id);

			if (note) {
				archivedNotes.forEach((note, i) => {
					if (note.id === id) state.archivedNotes.splice(i, 1);
				});
				state.notes.push(note);
			}
		},
	},
	extraReducers: {
		[GetAllNotes.fulfilled.type]: (state, action: PayloadAction<Notes>) => {
			state.notes = action.payload ?? [];
		},
		[GetStats.fulfilled.type]: (state, action: PayloadAction<NotesStats>) => {
			state.stats = action.payload ?? [];
		},
		[CreateNoteAsync.fulfilled.type]: (state, action: PayloadAction<Note>) => {
			state.notes.push(action.payload);
			state.stats.categories[action.payload.category] += 1;
		},
		[DeleteNoteAsync.fulfilled.type]: (state, action: PayloadAction<Notes>) => {
			state.notes = action.payload ?? [];
		},
		[EditNoteAsync.fulfilled.type]: (state, action: PayloadAction<Notes>) => {
			state.notes = action.payload ?? [];
		},
	},
});

export const notesReducer = notesSlice.reducer;
