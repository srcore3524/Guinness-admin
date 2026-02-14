import Image from "next/image";

export default function SocialLoginSection({ label = "or login with" }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-[17px]">
        <div className="h-px flex-1 bg-gn-stroke" />
        <span className="text-[13px] text-gn-gray">{label}</span>
        <div className="h-px flex-1 bg-gn-stroke" />
      </div>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-gn-primary py-[10px] text-[13px] font-medium tracking-[-0.26px] text-gn-primary transition-colors hover:bg-gn-primary/5"
      >
        <Image
          src="/images/google-icon.svg"
          alt="Google"
          width={22}
          height={22}
        />
        Google
      </button>
    </div>
  );
}
