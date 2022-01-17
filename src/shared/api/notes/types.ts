export type Note<T = {}> = {
	category: "task" | "idea" | "quote" | "random thought";
	content: string;
	created: string;
	date: string;
	id: string;
	name: string;
} & T;

export type Notes = Note[];

export type NotesStats = {
	notesCount: number;
	categories: { [key: string]: number };
};
