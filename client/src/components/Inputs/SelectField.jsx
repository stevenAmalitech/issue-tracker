export default function SelectField(props) {
  const { name, label, onChange, value, options } = props;

  const inputClasses =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

  const labelClasses = "block mb-2 text-sm font-medium text-gray-900 ";

  // TODO: VALIDATION

  return (
    <div className="mb-4 relative">
      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>
      <select
        className={inputClasses}
        name={name}
        onChange={onChange}
        value={value}
      >
        <option value="" disabled hidden></option>
        {options?.map((option) => {
          let { text, value, title } = option;
          if (typeof option === "string") value = option;

          return (
            <option value={value} key={value} title={title}>
              {text || value}
            </option>
          );
        })}
      </select>
    </div>
  );
}
