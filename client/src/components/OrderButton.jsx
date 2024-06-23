export default function OrderButton({ text, onClick }) {
  const buttonStyles = `w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`;

  return (
    <button className={buttonStyles} onClick={onClick}>
    {text}
    </button>
  );
}
