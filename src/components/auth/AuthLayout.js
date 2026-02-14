import Image from "next/image";
import AuthHero from "./AuthHero";
import AuthFooter from "./AuthFooter";

export default function AuthLayout({ children, wide = false, showHero = true }) {
  return (
    <div className="flex h-screen w-full bg-white">
      <div
        className={`relative flex w-full flex-col items-center justify-center ${
          showHero ? "lg:w-[46%]" : ""
        }`}
      >
        <div className="absolute left-6 top-5">
          <Image
            src="/images/logo.svg"
            alt="Guinness Global Investors"
            width={122}
            height={26}
            priority
          />
        </div>

        <div className={wide ? "w-[496px]" : "w-[320px]"}>{children}</div>

        <AuthFooter />
      </div>

      {showHero && <AuthHero />}
    </div>
  );
}
