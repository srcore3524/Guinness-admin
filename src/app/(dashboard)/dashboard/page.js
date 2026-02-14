"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Home,
  ChevronRight,
  Star,
  TrendingUp,
  TrendingDown,
  ExternalLink,
  Settings2,
  Plus,
  XCircle,
  CalendarDays,
  ShoppingBag,
} from "lucide-react";
import SortableHeader, { useSortableData } from "@/components/ui/SortableHeader";

const STOCK_CARDS = [
  { name: "Unilever", ticker: "UL", price: "$152.95", change: "+1.34%", up: true, logo: "/images/logos/unilever.png" },
  { name: "Coca Cola", ticker: "KO", price: "$23.13", change: "+0.12%", up: true, logo: "/images/logos/cocacola.png" },
  { name: "Pepsi Co.", ticker: "PEP", price: "$92.32", change: "-4.41%", up: false, logo: "/images/logos/pepsi.png" },
  { name: "Mondelez Intl", ticker: "MDLZ", price: "$48.34", change: "+12.43%", up: true, logo: "/images/logos/mondelez.png" },
];

const TABLE_DATA = [
  { date: "20.03.25", stock: "Coca Cola", logo: "/images/logos/cocacola.png", analyst: "HS", avatar: "/images/table-avatar1.png", noteType: "Earnings", hn: "H", reason: "Periodic", details: "A strong quarter/year for Novo particularly given LLY's preliminary sales results in Jan which sent ..." },
  { date: "20.03.25", stock: "Procter & Gamble", logo: "/images/logos/pg.png", analyst: "HS", avatar: "/images/table-avatar2.png", noteType: "Earnings", hn: "N", reason: "Periodic", details: "A strong quarter/year for Novo particularly given LLY's preliminary sales results in Jan which sent ..." },
  { date: "20.03.25", stock: "Unilever", logo: "/images/logos/unilever.png", analyst: "HS", avatar: "/images/table-avatar1.png", noteType: "Earnings", hn: "H", reason: "Periodic", details: "A strong quarter/year for Novo particularly given LLY's preliminary sales results in Jan which sent ..." },
  { date: "20.03.25", stock: "Mondelez Intl", logo: "/images/logos/mondelez.png", analyst: "HS", avatar: "/images/table-avatar2.png", noteType: "Earnings", hn: "H", reason: "Periodic", details: "A strong quarter/year for Novo particularly given LLY's preliminary sales results in Jan which sent ..." },
  { date: "20.03.25", stock: "Pepsi Co.", logo: "/images/logos/pepsi.png", analyst: "HS", avatar: "/images/table-avatar1.png", noteType: "Earnings", hn: "H", reason: "Periodic", details: "A strong quarter/year for Novo particularly given LLY's preliminary sales results in Jan which sent ..." },
];

const UPCOMING_DATES = [
  { company: "Pepsico Earnings", type: "Demo", date: "30.05.25" },
  { company: "Coca Cola Proxy", type: "Demo", date: "30.05.25" },
  { company: "Pepsico Earnings", type: "Demo", date: "30.05.25" },
  { company: "Pepsico Earnings", type: "Demo", date: "30.05.25" },
];

const TABS = ["Core Notes", "Non-Core Notes", "Earnings"];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Core Notes");

  return (
    <div className="flex flex-1 gap-5">
      <div className="flex flex-1 flex-col">
        <Breadcrumb />
        <StockCards />
        <NotesTable activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <RightPanel />
    </div>
  );
}

function Breadcrumb() {
  return (
    <div className="mb-4 flex items-center gap-1 text-[12px] text-gn-gray">
      <Home size={14} />
      <ChevronRight size={14} />
      <span className="text-gn-text">Dashboard</span>
    </div>
  );
}

function StockCards() {
  return (
    <div className="mb-4 grid grid-cols-4 gap-3">
      {STOCK_CARDS.map((stock) => (
        <div
          key={stock.ticker}
          className="rounded-lg border border-[#efeff0] bg-white p-3"
        >
          <div className="mb-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src={stock.logo}
                alt={stock.ticker}
                width={30}
                height={30}
                className="rounded-md"
              />
              <span className="text-[13px] font-medium text-gn-text">
                {stock.name}
              </span>
            </div>
            <Star size={16} className="text-amber-400 fill-amber-400" />
          </div>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-[18px] font-semibold text-gn-text">
              {stock.price}
            </span>
            <div className="flex items-center gap-1">
              {stock.up ? (
                <TrendingUp size={14} className="text-green-500" />
              ) : (
                <TrendingDown size={14} className="text-gn-red" />
              )}
              <span
                className={`text-[12px] font-medium ${
                  stock.up ? "text-green-500" : "text-gn-red"
                }`}
              >
                {stock.change}
              </span>
            </div>
          </div>
          <div className="h-[34px] w-full">
            <svg viewBox="0 0 175 34" className="h-full w-full">
              <path
                d={
                  stock.up
                    ? "M0,25 Q20,20 40,22 T80,15 T120,18 T160,10 L175,8"
                    : "M0,10 Q20,15 40,12 T80,20 T120,25 T160,28 L175,30"
                }
                fill="none"
                stroke={stock.up ? "#22c55e" : "#CF132D"}
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

function NotesTable({ activeTab, setActiveTab }) {
  const { sorted, sortKey, sortDir, requestSort } = useSortableData(TABLE_DATA);

  return (
    <div className="flex-1 rounded-lg border border-[#efeff0] bg-white">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="flex gap-2 rounded-lg bg-[#EFF3F9] p-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-lg px-4 py-1.5 text-[13px] font-medium transition-colors ${
                activeTab === tab
                  ? "bg-white text-gn-primary shadow-sm"
                  : "text-gn-gray hover:text-gn-text"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-gn-primary px-4 py-1.5 text-[13px] font-medium text-gn-primary hover:bg-gray-50">
          <Settings2 size={14} />
          Customize
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-[13px]">
          <thead>
            <tr className="border-b border-[#efeff0] text-[12px] text-gn-gray">
              <SortableHeader label="Date" sortKey="date" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-5 pb-3" />
              <SortableHeader label="Stock" sortKey="stock" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3" />
              <SortableHeader label="Analyst" sortKey="analyst" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3" />
              <SortableHeader label="Note Type" sortKey="noteType" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3" />
              <SortableHeader label="H/N" sortKey="hn" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3" />
              <SortableHeader label="Reason" sortKey="reason" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3" />
              <th className="px-3 pb-3 font-medium">Details</th>
              <th className="px-3 pb-3" />
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => (
              <tr
                key={i}
                className="border-b border-[#efeff0] transition-colors hover:bg-gray-50"
              >
                <td className="px-5 py-4 text-gn-gray">{row.date}</td>
                <td className="px-3 py-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={row.logo}
                      alt={row.stock}
                      width={26}
                      height={26}
                      className="rounded-full"
                    />
                    <span className="font-medium text-gn-text">
                      {row.stock}
                    </span>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <Image
                    src={row.avatar}
                    alt={row.analyst}
                    width={26}
                    height={26}
                    className="rounded-full object-cover"
                  />
                </td>
                <td className="px-3 py-4 text-gn-text">{row.noteType}</td>
                <td className="px-3 py-4">
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold text-white ${
                      row.hn === "H" ? "bg-orange-500" : "bg-green-500"
                    }`}
                  >
                    {row.hn}
                  </div>
                </td>
                <td className="px-3 py-4 text-gn-text">{row.reason}</td>
                <td className="max-w-[220px] truncate px-3 py-4 text-gn-gray">
                  {row.details}
                </td>
                <td className="px-3 py-4">
                  <button className="text-gn-gray hover:text-gn-primary">
                    <ExternalLink size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RightPanel() {
  return (
    <div className="flex w-[280px] shrink-0 flex-col gap-5">
      <UpcomingDates />
      <OutstandingSalesRequests />
    </div>
  );
}

function UpcomingDates() {
  return (
    <div className="rounded-lg border border-[#efeff0] bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        <CalendarDays size={18} className="text-gn-text" />
        <h3 className="text-[14px] font-semibold text-gn-text">
          Upcoming Dates
        </h3>
      </div>

      <table className="w-full text-[12px]">
        <thead>
          <tr className="text-gn-gray">
            <th className="pb-2 text-left font-medium">Company</th>
            <th className="pb-2 text-left font-medium">Type</th>
            <th className="pb-2 text-right font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {UPCOMING_DATES.map((item, i) => (
            <tr key={i} className="border-t border-[#efeff0]">
              <td className="py-2 text-gn-text">{item.company}</td>
              <td className="py-2 text-gn-text">{item.type}</td>
              <td className="py-2 text-right text-gn-text">{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OutstandingSalesRequests() {
  return (
    <div className="rounded-lg border border-[#efeff0] bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        <ShoppingBag size={18} className="text-gn-text" />
        <h3 className="text-[14px] font-semibold text-gn-text">
          Outstanding Sales Requests
        </h3>
      </div>

      <div className="flex flex-col items-center gap-3 py-6">
        <XCircle size={48} className="text-[#efeff0]" />
        <p className="text-[13px] text-gn-gray">Nothing to find here</p>
      </div>

      <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gn-primary py-2 text-[13px] font-medium text-white hover:bg-gn-primary-dark">
        <Plus size={16} />
        Create New Project
      </button>
    </div>
  );
}
