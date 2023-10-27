"use client";
import React, { useState, useRef, useEffect } from "react";
import { Idata } from "../page";

interface Props {
	data: Idata[];
}
interface Iparams {
	i: number;
	j: number;
}

function DragNDrop({ data }: Props) {
	const [list, setList] = useState<Idata[]>(data);
	const [dragging, setDragging] = useState<boolean>(false);

	// To preserve the data during re-renders
	const dragItem = useRef<Iparams>({ i: 1000, j: 1000 });
	const dragNode = useRef<any>();

	// For dynamic tailwind classes
	const colorVariants: any = {
		white: `bg-white`,
		black: `bg-black`,
		red: `bg-red-400`,
	};

	const getStyles = (params: Iparams) => {
		const currentItem = dragItem.current;
		if (typeof currentItem === "object") {
			if (currentItem?.i === params.i && currentItem.j === params.j) {
				return `bg-slate-700 text-white mb-1 h-full w-full p-[25%]`;
			} else {
				return `bg-white mb-1 h-full w-full p-[25%]`;
			}
		}
	};

	const handleDragStart = (e: React.DragEvent, params: Iparams) => {
		console.log("drag starting...", params);
		dragItem.current = params;
		dragNode.current = e.target;
		dragNode.current.addEventListener("dragend", handleDragEnd);
		setTimeout(() => {
			setDragging(true);
		}, 0);
	};
	const handleDragEnd = () => {
		console.log("Ending drag...");
		setDragging(false);
		dragNode.current.removeEventListener("dragend", handleDragEnd);
		// dragItem.current = null;
		// dragNode.current = null;
	};
	const handleDragEnter = (e: React.DragEvent, params: Iparams) => {
		console.log("Entering drag ...");
		console.log(params);
		const currentItem = dragItem.current;
		if (e.target !== dragNode.current) {
			console.log("TARGET IS NOT THE SAME");
			setList((prev) => {
				// Deep copy of the prev object unlike [...prev] which creates a shallow copy
				let newList = JSON.parse(JSON.stringify(prev));
				newList[params.i].items.splice(
					params.i,
					0,
					newList[currentItem.i].items.splice(currentItem?.i, 1)[0]
				);
				dragItem.current = params;
				return newList;
			});
		}
	};

	return (
		<div className="drag-n-drop grid gap-1 w-[45%] h-[45%] grid-cols-2 text-center p-2 items-start">
			{list.map((grp, i) => (
				<div key={grp.title} className="dnd-group bg-slate-500 rounded-sm p-2 ">
					<div className="group-title text-white text-left mb-1">
						{`Group ${i + 1}`}
					</div>
					{grp.items.map((item, j) => (
						<div
							key={item}
							draggable
							onDragStart={(e) => {
								handleDragStart(e, { i, j });
							}}
							onDragEnter={(e) => {
								handleDragEnter(e, { i, j });
							}}
							className={
								dragging
									? getStyles({ i, j })
									: `bg-white mb-1 h-full w-full p-[25%]`
							}>
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
