export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  suffix,
  error,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-medium leading-[1.5] text-gn-primary">
        {label}
      </label>
      <div
        className={`flex h-[42px] items-center justify-between rounded-lg border bg-gn-input px-3 ${
          error ? "border-gn-red" : "border-gn-stroke"
        }`}
      >
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-[13px] font-medium tracking-[-0.26px] text-gn-text outline-none placeholder:font-normal placeholder:text-gn-gray"
        />
        {suffix}
      </div>
      {error && (
        <p className="text-[11px] text-gn-red">{error}</p>
      )}
    </div>
  );
}
