import { Home, ChevronRight } from "lucide-react";

export default function Breadcrumb({ items }) {
  return (
    <div className="mb-4 flex items-center gap-1 text-[12px] text-gn-gray">
      <Home size={14} />
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={14} />
          <span className={i === items.length - 1 ? "text-gn-text" : ""}>
            {item}
          </span>
        </span>
      ))}
    </div>
  );
}
