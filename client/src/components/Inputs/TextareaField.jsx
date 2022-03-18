export default function TextareaField(props) {
  const { name, id, label, onChange, value } = props;

  const labelClasses = "block mb-2 text-sm font-medium text-gray-900 ";

  const textareaClasses =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5";

  //TODO: VALIDATION

  return (
    <div>
      <label htmlFor={id || name} className={labelClasses}>
        {label}
      </label>
      <textarea
        className={textareaClasses}
        name={name}
        id={id || name}
        value={value}
        onChange={onChange}
        cols="30"
        rows="10"
      ></textarea>
    </div>
  );
}
