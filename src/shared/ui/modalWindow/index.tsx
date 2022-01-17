import { CloseCircleOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useUpdateEffect } from "shared/hooks";
import { Portal } from "shared/lib";
import s from "./style.module.scss";

type PropsT = {
	children: React.ReactNode;
	view: boolean;
	title?: string;
	onExit: () => void;
};

function ModalWindow({ children, title, onExit, view, ...props }: PropsT & React.HTMLAttributes<HTMLDivElement>) {
	useUpdateEffect(() => {
		view ? (document.body.style.overflow = "hidden") : (document.body.style.overflow = "visible");
	}, [view]);

	useEffect(() => {
		return () => {
			document.body.style.overflow = "visible";
		};
	}, []);

	const exitAction = () => {
		onExit();
	};

	return (
		<>
			{view && (
				<Portal>
					<div className={s.screen} onClick={exitAction}>
						<div {...props} className={`${s.modal} ${props.className}`} onClick={(e) => e.stopPropagation()}>
							{title && (
								<div className={s.header}>
									<h1>{title}</h1>
									<CloseCircleOutlined className={s.close} onClick={exitAction} />
								</div>
							)}
							{children}
						</div>
					</div>
				</Portal>
			)}
		</>
	);
}

export default ModalWindow;
