export default function SubmitButton({ children }) {
  return (
    <button
      type="submit"
      className="w-full rounded-lg bg-gn-primary py-[10px] text-[13px] font-medium tracking-[-0.26px] text-white transition-colors hover:bg-gn-primary-dark"
    >
      {children}
    </button>
  );
}
