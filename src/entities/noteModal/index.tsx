import { Button } from "antd/lib/radio";
import React, { memo, useState } from "react";
import { ModalWindow } from "shared/ui";
import s from "./styles.module.scss";

type defaultValues = {
	name: string;
	category: string;
	content: string;
	date: string;
};

type PropsT = {
	trigger: React.ReactNode;
	onSubmit: ({ name, category, content, date }: defaultValues) => void;
	defaultValues?: defaultValues;
};

export const NoteModal = memo(({ trigger, onSubmit, defaultValues }: PropsT) => {
	const [view, setView] = useState(false);
	const [error, setError] = useState("");
	const {
		category: defaultCategory = "idea",
		content: defaultContent = "",
		date: defaultDate = "",
		name: defaultName = "",
	} = defaultValues ?? {};

	const [name, setName] = useState(defaultName);
	const [category, setCategory] = useState(defaultCategory);
	const [content, setContent] = useState(defaultContent);
	const [date, setDate] = useState(defaultDate);

	const save = async () => {
		if (name && category && content && date) {
			onSubmit({ name, category, content, date });
			if (!defaultValues?.category) {
				setCategory("idea");
				setContent("");
				setDate("")
				setName("");
			}

			setView(false);
		} else setError("please provide all fields");
	};

	return (
		<>
			<div onClick={() => setView(true)} style={{ cursor: "pointer" }}>
				{trigger}
			</div>
			<ModalWindow
				className={s.modal}
				onExit={() => {
					setView(false);
				}}
				view={view}
				title={"Create note"}
				children={
					<div className={s.screen}>
						<p>{error}</p>
						<input className={s.name} value={name} placeholder="Task" onChange={(e) => setName(e.target.value)} />
						<textarea
							className={s.content}
							value={content}
							placeholder="Write something…"
							onChange={(e) => setContent(e.target.value)}
						/>
						<div>
							<label htmlFor="category">Category </label>
							<select
								id="category"
								value={category}
								onChange={(e) => {
									setCategory(e.target.value);
								}}>
								<option value="task">task</option>
								<option value="idea">idea</option>
								<option value="quote">quote</option>
								<option value="random thought">random thought</option>
							</select>
						</div>
						<div>
							<label htmlFor="date">Date </label>
							<input value={date} onChange={(e) => setDate(e.target.value)} type="date" id="date" />
						</div>

						<div className={s.buttons}>
							<Button onClick={save}>Save</Button>
						</div>
					</div>
				}
			/>
		</>
	);
});
