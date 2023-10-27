import React from "react";
import DragNDrop from "./components/DragNDrop";

export interface Idata {
	title: string;
	items: string[];
}

const data: Idata[] = [
	{ title: "group 1", items: ["1", "2", "3"] },
	{ title: "group 2", items: ["4", "5"] },
];
function Dnd() {
	return (
		<div>
			<header className="bg-slate-800 flex justify-center items-center w-screen min-h-screen ">
				<DragNDrop data={data} />
			</header>
		</div>
	);
}

export default Dnd;
