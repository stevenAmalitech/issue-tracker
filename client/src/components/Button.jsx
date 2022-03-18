export default function Button(props) {
  const { text, onClick } = props;

  const buttonClasses =
    "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-9 py-2.5 text-center capitalize"

  return (
    <button className={buttonClasses} onClick={onClick}>
      {text}
    </button>
  );
}
