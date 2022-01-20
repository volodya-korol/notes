import { Button } from "antd/lib/radio";
import React, { memo, useState } from "react";
import { getDate } from "shared/lib";
import { ModalWindow } from "shared/ui";
import s from "./styles.module.scss";

type defaultValues<T = {}> = {
	name: string;
	category: string;
	content: string;
} & T;

type PropsT = {
	trigger: React.ReactNode;
	onSubmit: ({ name, category, content, date }: defaultValues<{ date: string }>) => void;
	defaultValues?: defaultValues;
};

export const NoteModal = memo(({ trigger, onSubmit, defaultValues }: PropsT) => {
	const [view, setView] = useState(false);
	const [error, setError] = useState("");
	const {
		category: defaultCategory = "idea",
		content: defaultContent = "",
		name: defaultName = "",
	} = defaultValues ?? {};

	const [name, setName] = useState(defaultName);
	const [category, setCategory] = useState(defaultCategory);
	const [content, setContent] = useState(defaultContent);

	const save = async () => {
		const date = getDate(content);
		if(!date) setError("write date in content  (date format dd-mm-yy example 31.05.2022 , 01/12/2010)")
		else if (name && category && content && date) {
			onSubmit({ name, category, content, date });
			if (!defaultValues?.category) {
				setCategory("idea");
				setContent("");
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
						<p style={{color: "red"}}>{error}</p>
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

						<div className={s.buttons}>
							<Button onClick={save}>Save</Button>
						</div>
					</div>
				}
			/>
		</>
	);
});
