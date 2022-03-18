export default function FileUploadField(props) {
  const { id, name, label, onChange, value } = props;

  const labelClasses = "block mb-2 text-sm font-medium text-gray-900";

  const inputClasses =
    "block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-transparent";

  return (
    <div>
      <label className={labelClasses} htmlFor={id | name}>
        {label}
      </label>
      <input
        className={inputClasses}
        id={id || name}
        type="file"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
