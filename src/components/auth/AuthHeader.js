export default function AuthHeader({ title, subtitle }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <h1 className="text-[25px] font-bold leading-[1.5] text-gn-text">
        {title}
      </h1>
      <p className="text-[13px] leading-[1.3] text-gn-gray">{subtitle}</p>
    </div>
  );
}
