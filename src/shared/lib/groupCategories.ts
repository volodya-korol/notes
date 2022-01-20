import { Notes } from "shared/api/notes/types";

export const groupCategories = (notes: Notes, archiveedNotes: Notes) => {
	let categories: {
		[key: string]: {
			active?: number;
			archived?: number;
		};
	} = {
		task: {},
		quote: {},
		idea: {},
		"random thought": {},
	};

	for (let i = 0; i < notes.length; i++) {
		categories[notes[i].category] = {
			active: (categories[notes[i].category]?.active ?? 0) + 1,
			archived: 0,
		};
	}
	for (let i = 0; i < archiveedNotes.length; i++) {
		categories[archiveedNotes[i].category].archived = (categories[archiveedNotes[i].category]?.archived ?? 0) + 1;
	}

	return categories;
};
