export default function Modal(props) {
  const { hide, children, closeModal } = props;

  if (hide) return null;

  const handleClick = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div
      id="defaultModal"
      aria-hidden="true"
      className="h-screen w-full flex justify-center items-center bg-gray-900/50 overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0"
      onClick={handleClick}
    >
      <div className="relative px-4 w-full max-w-2xl h-full md:h-auto">
        {children}
      </div>
    </div>
  );
}
