export default function InputField(props) {
  const { type = "text", name, label, onChange, value } = props;

  const inputClasses =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

  const labelClasses = "block mb-2 text-sm font-medium text-gray-900 ";

  // TODO: VALIDATION

  return (
    <div className="mb-4 relative">
      <label htmlFor={name} className={labelClasses}>
        {label}
      </label>
      <input
        className={inputClasses}
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
