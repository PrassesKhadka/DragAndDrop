import React from "react";
import { Idata } from "../page";

interface Props {
	data: Idata[];
}

function DragNDrop({ data }: Props) {
	return (
		<div className="drag-n-drop grid gap-1 w-full h-full grid-cols-2 text-center p-2 items-start">
			{data.map((grp, i) => (
				<div key={grp.title} className="dnd-group bg-slate-500 rounded-sm p-2 ">
					<div className="group-title text-white text-left mb-1">
						{`Group ${++i}`}
					</div>
					{grp.items.map((item, i) => (
						<div
							key={item}
							draggable
							className="dnd-item bg-white mb-1 h-[150px] p-[25%]">
							<div>
								<p>{item}</p>
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
}

export default DragNDrop;
