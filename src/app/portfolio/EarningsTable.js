"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import SortableHeader from "@/components/ui/SortableHeader";
import { INDICATORS, INDICATOR_FIELDS } from "./data";

function seededIndicator(rowIdx, colIdx) {
  return INDICATORS[(rowIdx * 5 + colIdx * 3) % INDICATORS.length];
}

function Indicator({ type }) {
  const styles = {
    up: "bg-green-100",
    down: "bg-red-100",
    flat: "bg-amber-50",
  };
  const src = {
    up: "/images/indicator-up.svg",
    down: "/images/indicator-down.svg",
    flat: "/images/indicator-flat.svg",
  };
  if (src[type]) {
    return (
      <div className={`flex h-6 w-6 items-center justify-center rounded-md ${styles[type]}`}>
        <Image src={src[type]} alt={type} width={8} height={8} />
      </div>
    );
  }
  return <span className="text-gn-gray">-</span>;
}

export default function EarningsTable({ sorted, sortKey, sortDir, requestSort, toggleStar }) {
  return (
    <table className="w-full text-left text-[13px]">
      <thead className="sticky top-0 bg-white">
        <tr className="border-b border-[#efeff0] text-[12px] text-gn-gray">
          <th className="w-8 px-3 pb-3 pt-3" />
          <SortableHeader label={<>Global Equity<br/>Income</>} sortKey="name" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <SortableHeader label="Sector" sortKey="sector" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <SortableHeader label="Analyst" sortKey="analyst" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <th className="px-3 pb-3 pt-3 text-center font-medium">Result</th>
          <th className="px-3 pb-3 pt-3 text-center font-medium">Guidance</th>
          <th className="px-3 pb-3 pt-3 text-center font-medium">Market<br/>Reaction</th>
          <th className="px-3 pb-3 pt-3 text-center font-medium">Guinness<br/>Reaction</th>
          <SortableHeader label={<>Earnings Headline</>} sortKey="headline" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
        </tr>
      </thead>
      <tbody>
        {sorted.map((row, rowIdx) => (
          <tr key={row.id} className="border-b border-[#efeff0] transition-colors hover:bg-gray-50">
            <td className="px-3 py-3">
              <button onClick={() => toggleStar(row.id)}>
                <Star size={20} className={row.star ? "fill-amber-400 text-amber-400" : "text-gray-300 hover:text-amber-300"} />
              </button>
            </td>
            <td className="px-3 py-3">
              <div className="flex items-center gap-2">
                <Image src={row.logo} alt={row.name} width={26} height={26} className="rounded-full" />
                <div>
                  <div className="font-medium text-gn-text">{row.name}</div>
                  <div className="text-[10px] text-gn-gray">{row.ticker}</div>
                </div>
              </div>
            </td>
            <td className="px-3 py-3 text-gn-gray">{row.sector}</td>
            <td className="px-3 py-3">
              <Image src="/images/table-avatar2.png" alt="Analyst" width={26} height={26} className="rounded-full object-cover" />
            </td>
            {INDICATOR_FIELDS.map((field, colIdx) => (
              <td key={field} className="px-3 py-3">
                <div className="flex justify-center">
                  <Indicator type={seededIndicator(rowIdx, colIdx)} />
                </div>
              </td>
            ))}
            <td className="px-3 py-3 text-[12px] leading-[16px] text-gn-gray">{row.headline}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
