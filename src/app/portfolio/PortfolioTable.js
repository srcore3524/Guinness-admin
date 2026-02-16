"use client";

import Image from "next/image";
import { Star, ExternalLink } from "lucide-react";
import SortableHeader from "@/components/ui/SortableHeader";
import { DATE_STYLES } from "./data";

function seededStyle(rowIdx, colIdx) {
  return DATE_STYLES[(rowIdx * 7 + colIdx * 3) % DATE_STYLES.length];
}

export default function PortfolioTable({ sorted, sortKey, sortDir, requestSort, toggleStar, dateFields, headers }) {
  return (
    <table className="w-full text-left text-[13px]">
      <thead className="sticky top-0 bg-white">
        <tr className="border-b border-[#efeff0] text-[12px] text-gn-gray">
          <th className="w-8 px-3 pb-3 pt-3" />
          <SortableHeader label={<>Global Equity<br/>Income</>} sortKey="name" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <SortableHeader label="Sector" sortKey="sector" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <SortableHeader label="Purchase" sortKey="purchase" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <SortableHeader label="Analyst" sortKey="analyst" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <th className="px-3 pb-3 pt-3 font-medium">Model</th>
          {dateFields.map((field) => (
            <SortableHeader key={field} label={headers[field]} sortKey={field} activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          ))}
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
            <td className="px-3 py-3 text-gn-gray">{row.purchase}</td>
            <td className="px-3 py-3">
              <Image src="/images/table-avatar2.png" alt="Analyst" width={26} height={26} className="rounded-full object-cover" />
            </td>
            <td className="px-3 py-3">
              <button className="text-gn-gray hover:text-gn-primary"><ExternalLink size={16} /></button>
            </td>
            {dateFields.map((field, colIdx) => (
              <td key={field} className="px-3 py-3">
                <span className={`inline-block rounded-md px-3 py-1 text-[12px] font-medium ${seededStyle(rowIdx, colIdx)}`}>02/24</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
