import {
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type ChangeEventHandler,
} from "react";
import Select from "react-select";

type CommonProps = {
  label: string;
  name: string;
  error?: boolean; // Nuevo: para mostrar borde rojo y mensaje si es inválido
};

type InputFieldProps = {
  type?: Exclude<string, "select">;
  onChange?: ChangeEventHandler<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

type SelectFieldProps = {
  type: "select";
  options: { value: string; label: string }[];
  key?: any;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
} & SelectHTMLAttributes<HTMLSelectElement>;

type FormFieldProps = CommonProps & (InputFieldProps | SelectFieldProps);

export default function FormField(props: FormFieldProps) {
  const { label, name, value, type = "text", error, ...rest } = props;

  const isInvalid =
    type === "number" &&
    //@ts-ignore
    typeof rest.max !== "undefined" &&
    value !== undefined &&
    //@ts-ignore
    Number(value) > Number(rest.max);

  const showError = error || isInvalid;

  return (
    <div className="flex flex-col gap-1 text-sm">
      <label htmlFor={name} className="font-medium text-gray-700">
        {label}
      </label>

      {type === "select" && "options" in props ? (
        //@ts-ignore
        <Select
          id={props.key || name}
          name={name}
          value={props?.options.find((opt: any) => opt.value === value)}
          className="shadow-sm"
          //@ts-ignore
          options={props?.options || []}
          {...(rest as Omit<SelectFieldProps, "type" | "options" | "label" | "name">)}
        />
      ) : (
        <>
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            className={`p-2 border rounded bg-white text-black shadow-sm ${
              showError ? "border-red-500" : "border-gray-300"
            }`}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
          />
          {showError && (
            <span className="text-red-500 text-xs mt-1">
              {error
                ? "The sum of the three percentages (Engineering %, Architecture %, Sr. Architecture %) must equal 100%."
                : "The value must not exceed the maximum allowed."}
            </span>
          )}
        </>
      )}
    </div>
  );
}