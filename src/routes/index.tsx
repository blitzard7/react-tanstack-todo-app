import { InputField, SubmitButton, useAppForm } from "@/lib/form-context";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const todoSchema = z.object({
	title: z.string().min(1),
	description: z.string().optional(),
});

type TodoSchema = z.infer<typeof todoSchema>;

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	const form = useAppForm({
		defaultValues: {
			title: "",
			description: "",
		} as TodoSchema,
		validators: {
			onChange: todoSchema,
		},
		onSubmit: ({ value }) => {
			console.log(value);
		},
	});

	return (
		<div className="space-y-4 p-4 bg-slate-50 rounded shadow">
			<header>
				<h2>Todo App</h2>
			</header>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<form.AppField
					name="title"
					children={(field) => <field.InputField label="Title" />}
				/>
				<form.AppField
					name="description"
					children={(field) => <field.InputField label="Description" />}
				/>
				<form.AppForm>
					<form.SubmitButton label="Submit" />
				</form.AppForm>
			</form>
		</div>
	);
}
