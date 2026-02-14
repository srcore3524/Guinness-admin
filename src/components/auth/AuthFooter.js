import Link from "next/link";

export default function AuthFooter() {
  return (
    <div className="absolute bottom-[14px] left-0 flex w-full items-center px-6">
      <div className="flex gap-4">
        <Link
          href="/privacy"
          className="text-[11px] tracking-[-0.11px] text-gn-gray hover:text-gn-primary"
        >
          Privacy Policy
        </Link>
        <Link
          href="/help"
          className="text-[11px] tracking-[-0.11px] text-gn-gray hover:text-gn-primary"
        >
          Help &amp; Support
        </Link>
      </div>
      <p className="ml-auto text-[11px] tracking-[-0.11px] text-gn-gray">
        Copyright &copy; 2025. Guinness
      </p>
    </div>
  );
}
