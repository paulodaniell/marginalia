export default function Button({ children, isPending, disabled, ...props }) {
  return (
    <button
      {...props}
      disabled={isPending || disabled}
      className="w-full py-2.5 px-4 bg-indigo text-white font-medium text-sm rounded-lg hover:opacity-95 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? "Entrando..." : children}
    </button>
  );
}