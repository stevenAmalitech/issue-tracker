export default function FileUploadField(props) {
  const { id, name, label, ref} = props;

  const fileLabelClasses = "block mb-2 text-sm font-medium text-gray-900";

  const fileInputClasses =
    "block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none focus:border-transparent";

  return (
    <div>
      <label className={fileLabelClasses} htmlFor={id | name}>
        {label}
      </label>
      <input
        className={fileInputClasses}
        id={id || name}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        ref={ref}
      />
    </div>
  );
}
