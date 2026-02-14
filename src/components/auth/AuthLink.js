import Link from "next/link";

export default function AuthLink({ text, linkText, href }) {
  return (
    <p className="text-center text-[13px] tracking-[-0.13px] text-gn-gray">
      {text}{" "}
      <Link
        href={href}
        className="font-medium text-gn-primary hover:underline"
      >
        {linkText}
      </Link>
    </p>
  );
}
