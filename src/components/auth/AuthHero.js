import Image from "next/image";

export default function AuthHero() {
  return (
    <div className="relative hidden overflow-hidden rounded-lg lg:block lg:w-[54%]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 57% 22%, #1A2D61 0%, #0E1F4E 100%)",
        }}
      />
      <Image
        src="/images/login-bg-pattern.png"
        alt=""
        fill
        className="object-cover opacity-20 mix-blend-lighten"
      />
      <div className="absolute left-[10%] top-1/2 w-[105%] -translate-y-1/2">
        <div className="overflow-hidden rounded-lg border-[5px] border-white/25">
          <Image
            src="/images/login-preview.png"
            alt="Guinness platform preview"
            width={1440}
            height={760}
            className="w-full"
            priority
          />
        </div>
      </div>
    </div>
  );
}
