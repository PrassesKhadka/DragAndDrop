"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
	const [widgets, setWidgets] = useState<string[]>([]);
	const [bgColor, setBgColor] = useState<string>("green");
	//to dynamically set tailwind classes this has to be present here
	const test1 = "bg-green-400";
	const test2 = "bg-red-400";

	function handleOnDrag(e: React.DragEvent, widgetType: string) {
		// we added a widgetType in e
		e.dataTransfer.setData("widgetType", widgetType);
		setBgColor("green");
	}

	function handleOnDrop(e: React.DragEvent) {
		const widgetType = e.dataTransfer.getData("widgetType") as string;

		setWidgets([...widgets, widgetType]);
		setBgColor("green");
	}

	// when you dragover the required div this function gets fired up
	function handleDragOver(e: React.DragEvent) {
		e.preventDefault();
		setBgColor("red");
	}
	function handleDragExit(e: React.DragEvent) {
		e.preventDefault();
		setBgColor("green");
	}
	return (
		<div className="App flex justify-center  items-center bg-blue-400 h-screen w-screen">
			<div className="widgets m-2 ">
				<div
					className="widgets border p-2"
					draggable
					onDragStart={(e) => handleOnDrag(e, "Widget A")}>
					Widget A
				</div>

				<div
					className="widgets border p-2"
					draggable
					onDragStart={(e) => handleOnDrag(e, "Widget B")}>
					Widget B
				</div>

				<div
					className="widgets border p-2"
					draggable
					onDragStart={(e) => handleOnDrag(e, "Widget C")}>
					Widget C
				</div>
			</div>
			<div
				className={`page bg-${bgColor}-400 border-2 h-[25%] w-[25%] p-2 flex flex-wrap justify-evenly`}
				onDrop={handleOnDrop}
				// onDragOver={handleDragOver}
				onDragOver={handleDragOver}
				onDragLeave={handleDragExit}>
				{widgets.map((widget, index) => (
					<div className="dropped-widget" key={index}>
						{widget}
					</div>
				))}
			</div>
		</div>
	);
}
