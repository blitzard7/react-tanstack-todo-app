import { Input } from "@/components/ui/input";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="text-center">
			<header>
				<h2>Todo App</h2>
			</header>
			<span>Fancy todo app incoming :D</span>
		</div>
	);
}
