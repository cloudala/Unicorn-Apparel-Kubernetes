export default function DisabledPrimaryButton({ text }) {
  return (
    <button
      disabled={true}
      className="text-white bg-blue-700 opacity-50 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 text-center"
    >
      {text}
    </button>
  );
}
