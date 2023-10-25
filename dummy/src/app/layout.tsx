import Link from "next/link";
import "./globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<nav>
					<ul className="flex p-3 justify-between items-center">
						<li>
							<Link href="./Link">Click Me!!!</Link>
						</li>
					</ul>
				</nav>
				{children}
			</body>
		</html>
	);
}
