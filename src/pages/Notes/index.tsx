import { Row } from "entities/table/ui/row";
import { Table } from "entities/table/ui/table";
import { NewNote } from "features/newNote";
import { NotesRow } from "features/notesRow";
import { NotesTable } from "features/notesTable";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "shared/hooks";
import { groupCategories } from "shared/lib";
import { GetAllNotes } from "./model";
import s from "./styles.module.scss";

const Home = () => {
	const dispatch = useDispatch();
	const { notes, archivedNotes } = useAppSelector((state) => state.notesReducer);

	useEffect(() => {
		dispatch(GetAllNotes());
	}, [dispatch]);

	return (
		<div className={s.screen}>
			{notes.length ? (
				<>
					<h1>Notes</h1>
					<NotesTable
						rows={notes.map((m) => (
							<NotesRow key={m.id} note={m} />
						))}
					/>
					<NewNote />
				</>
			) : (
				<h2>Notes list empty</h2>
			)}

			{notes.length || archivedNotes.length ? (
				<>
					<h1>Stats Notes</h1>
					<Table
						title={["Note Category", "Active", "Archived"]}
						rows={Object.entries(groupCategories(notes, archivedNotes)).map(([key, value], i) => {
							return <Row key={key} category={key} rows={[key, value.active || 0, value.archived || 0]} />;
						})}
					/>
				</>
			) : (
				<h2>Notes stats empty </h2>
			)}

			{archivedNotes.length ? (
				<>
					<h1>Archive</h1>
					<NotesTable
						isArchived
						rows={archivedNotes.map((m) => (
							<NotesRow isArchived={true} key={m.id} note={m} />
						))}
					/>
				</>
			) : (
				<h2>Archived list empty</h2>
			)}
		</div>
	);
};

export default Home;
