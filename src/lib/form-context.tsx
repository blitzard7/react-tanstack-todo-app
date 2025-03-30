import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	type AnyFieldApi,
	createFormHook,
	createFormHookContexts,
} from "@tanstack/react-form";

const { fieldContext, formContext, useFieldContext, useFormContext } =
	createFormHookContexts();

const { useAppForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {
		InputField,
	},
	formComponents: { SubmitButton },
});

export function FieldInfo({ field }: { field: AnyFieldApi }) {
	return (
		<>
			{field.state.meta.isTouched && field.state.meta.errors.length ? (
				<em className="text-red-500">
					{field.state.meta.errors.map((err) => err.message).join(",")}
				</em>
			) : null}
			{/* {field.state.meta.isValidating ? "Validating..." : null} */}
		</>
	);
}

type InputFieldProps = React.ComponentProps<"input"> & {
	label: string;
};

function InputField({ label, ...inputProps }: InputFieldProps) {
	const field = useFieldContext<string>();
	return (
		<div className="space-y-2 w-full">
			<label htmlFor={field.name}>{label}</label>
			<Input
				id={field.name}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				{...inputProps}
			/>
			<FieldInfo field={field} />
		</div>
	);
}

function SubmitButton({ label }: { label: string }) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
			{([canSubmit, _]) => <Button disabled={!canSubmit}>{label}</Button>}
		</form.Subscribe>
	);
}

export { useAppForm, SubmitButton, InputField };
