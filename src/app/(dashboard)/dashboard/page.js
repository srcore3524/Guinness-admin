"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Home,
  ChevronRight,
  ChevronDown,
  FileText,
  TrendingUp,
  CalendarDays,
  TrendingDown,
  Triangle,
} from "lucide-react";
import SortableHeader, { useSortableData } from "@/components/ui/SortableHeader";
import {
  CORE_NOTES, NON_CORE_NOTES, EARNINGS_NOTES,
  PRICE_MONITORING, UPCOMING_DATES,
} from "./data";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1 text-[12px] text-gn-gray">
          <Home size={14} />
          <ChevronRight size={14} />
          <span className="text-gn-text">Dashboard</span>
        </div>
        <button className="flex items-center gap-1.5 text-[13px] font-medium text-gn-text">
          Portfolio: All
          <ChevronDown size={14} className="text-gn-primary" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-auto">
        <div className="grid min-w-[900px] max-h-[380px] grid-cols-[2fr_1fr_1fr] gap-4">
          <NotesCard title="Core Notes" data={CORE_NOTES} />
          <PriceMonitoring />
          <UpcomingDates />
        </div>
        <div className="grid min-w-[900px] max-h-[380px] grid-cols-2 gap-4">
          <NotesCard title="Non-Core Notes" data={NON_CORE_NOTES} />
          <NotesCard title="Earnings" data={EARNINGS_NOTES} />
        </div>
      </div>
    </div>
  );
}

function NotesCard({ title, data }) {
  const { sorted, sortKey, sortDir, requestSort } = useSortableData(data);

  return (
    <div className="group flex min-h-0 flex-col rounded-lg border border-[#efeff0] bg-white">
      <div className="shrink-0 flex items-center gap-1.5 px-4 pt-3 pb-2">
        <FileText size={16} className="text-gn-text" />
        <h3 className="text-[14px] font-semibold text-gn-text">{title}</h3>
      </div>
      <div className="card-scroll min-h-0 flex-1 overflow-auto">
      <table className="w-full text-left text-[12px]">
        <thead>
          <tr className="border-b border-[#efeff0] text-[11px] text-gn-gray">
            <SortableHeader label="Date" sortKey="date" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-4 py-1.5" />
            <SortableHeader label="Stock" sortKey="stock" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-2 py-1.5" />
            <SortableHeader label="Analyst" sortKey="analyst" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-2 py-1.5" />
            <SortableHeader label={<>Note<br/>Type</>} sortKey="noteType" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-2 py-1.5" />
            <SortableHeader label={<>GGI<br/>Sent.</>} sortKey="ggiUp" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-2 py-1.5" />
            <th className="px-2 py-1.5 font-medium">Details</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.id} className={`border-b border-[#efeff0] border-l-3 ${row.borderColor} transition-colors hover:bg-gray-50`}>
              <td className="px-4 py-2.5 text-gn-gray">{row.date}</td>
              <td className="px-2 py-2.5">
                <div className="flex items-center gap-1.5">
                  <Image src={row.logo} alt={row.stock} width={22} height={22} className="rounded-full" />
                  <span className="font-medium text-gn-text">{row.stock}</span>
                </div>
              </td>
              <td className="px-2 py-2.5">
                <Image src={row.avatar} alt="analyst" width={22} height={22} className="rounded-full object-cover" />
              </td>
              <td className="px-2 py-2.5">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                  {row.noteType}
                </span>
              </td>
              <td className="px-2 py-2.5">
                <div className={`flex h-7 w-7 items-center justify-center rounded-lg ${row.ggiUp ? "bg-green-100" : "bg-red-100"}`}>
                  <Triangle
                    size={8}
                    className={row.ggiUp ? "fill-green-600 text-green-600" : "rotate-180 fill-red-500 text-red-500"}
                  />
                </div>
              </td>
              <td className="max-w-[180px] px-2 py-2.5 text-[11px] leading-[16px] text-gn-gray">
                {row.details}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

function PriceMonitoring() {
  const { sorted, sortKey, sortDir, requestSort } = useSortableData(PRICE_MONITORING);

  return (
    <div className="group flex min-h-0 flex-col rounded-lg border border-[#efeff0] bg-white">
      <div className="shrink-0 flex items-center gap-1.5 px-4 pt-3 pb-2">
        <TrendingUp size={16} className="text-gn-text" />
        <h3 className="text-[14px] font-semibold text-gn-text">Price Monitoring</h3>
      </div>
      <div className="card-scroll min-h-0 flex-1 overflow-auto">
      <table className="w-full text-left text-[12px]">
        <thead>
          <tr className="border-b border-[#efeff0] text-[11px] text-gn-gray">
            <SortableHeader label="Company" sortKey="name" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-4 py-1.5" />
            <SortableHeader label="Gain/Loss" sortKey="gain" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-2 py-1.5" />
            <SortableHeader label="Price" sortKey="price" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-2 py-1.5" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.id} className="border-b border-[#efeff0] transition-colors hover:bg-gray-50">
              <td className="px-4 py-2">
                <div className="font-medium text-gn-text">{row.name}</div>
                {row.ticker && <div className="text-[10px] text-gn-gray">{row.ticker}</div>}
              </td>
              <td className="px-2 py-2">
                <div className="flex items-center gap-1">
                  {row.up ? (
                    <TrendingUp size={12} className="text-green-600" />
                  ) : (
                    <TrendingDown size={12} className="text-red-500" />
                  )}
                  <span className={row.up ? "font-medium text-green-600" : "font-medium text-red-500"}>
                    {row.gain}
                  </span>
                </div>
              </td>
              <td className="px-2 py-2 font-medium text-gn-text">{row.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

function UpcomingDates() {
  const { sorted, sortKey, sortDir, requestSort } = useSortableData(UPCOMING_DATES);

  return (
    <div className="group flex min-h-0 flex-col rounded-lg border border-[#efeff0] bg-white">
      <div className="shrink-0 flex items-center gap-1.5 px-4 pt-3 pb-2">
        <CalendarDays size={16} className="text-gn-text" />
        <h3 className="text-[14px] font-semibold text-gn-text">Upcoming Dates</h3>
      </div>
      <div className="card-scroll min-h-0 flex-1 overflow-auto">
      <table className="w-full text-left text-[12px]">
        <thead>
          <tr className="border-b border-[#efeff0] text-[11px] text-gn-gray">
            <SortableHeader label="Company" sortKey="company" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-4 py-1.5" />
            <SortableHeader label="Type" sortKey="type" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-2 py-1.5" />
            <SortableHeader label="Date" sortKey="date" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-2 py-1.5" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr key={i} className="border-b border-[#efeff0] transition-colors hover:bg-gray-50">
              <td className="px-4 py-2 text-gn-text">{row.company}</td>
              <td className="px-2 py-2 text-gn-text">{row.type}</td>
              <td className="px-2 py-2 text-gn-text">{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
