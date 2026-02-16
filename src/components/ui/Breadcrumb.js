import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export default function Breadcrumb({ items }) {
  return (
    <div className="mb-4 flex items-center gap-1 text-[12px] text-gn-gray">
      <Link href="/dashboard" className="hover:text-gn-text">
        <Home size={14} />
      </Link>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={i} className="flex items-center gap-1">
            <ChevronRight size={14} />
            {isLast ? (
              <span className="text-gn-text">{item.label || item}</span>
            ) : (
              <Link
                href={item.href || "#"}
                className="hover:text-gn-text"
              >
                {item.label || item}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
