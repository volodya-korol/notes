import { instance } from "../api";
import { Note, Notes, NotesStats } from "./types";

export const notesApi = {
	getNotes() {
		return instance.get<Notes>(`notes`).then((res) => res.data);
	},
	getNote(id: string) {
		return instance.get<Note>(`notes/${id}`).then((res) => res.data);
	},
	getStats() {
		return instance.get<NotesStats>(`notes/stats`).then((res) => res.data);
	},
	createNote(name: string, category: string, content: string, date: string) {
		return instance
			.post<Note>(`notes`, {
				name,
				category,
				content,
				date,
			})
			.then((res) => res.data);
	},
	deleteNote(id: string) {
		return instance.delete<Notes>(`notes/${id}`).then((res) => res.data);
	},
	editNote({
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
	}) {
		return instance.patch<Notes>(`notes/${id}`, { name, category, content, date }).then((res) => res.data);
	},
};
