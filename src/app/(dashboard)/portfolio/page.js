"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Home,
  ChevronRight,
  Star,
  ExternalLink,
  Settings2,
  ChevronDown,
  Settings,
  CalendarDays,
} from "lucide-react";
import SortableHeader, { useSortableData } from "@/components/ui/SortableHeader";

const MAIN_TABS = ["Dashboard", "Priorities", "Earnings", "Calendars", "NAVs", "Documents", "Fund"];
const SUB_TABS = ["Portfolio", "Watchlist", "Legacy"];

const DATE_STYLES = [
  "bg-green-100 text-green-600",
  "bg-amber-50 text-amber-500",
  "bg-red-100 text-gn-red",
];

function seededStyle(rowIdx, colIdx) {
  return DATE_STYLES[(rowIdx * 7 + colIdx * 3) % DATE_STYLES.length];
}

const DASHBOARD_DATA = [
  { id: 0, star: true, name: "Coca Cola", logo: "/images/logos/cocacola.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 1, star: false, name: "Procter & Gamble", logo: "/images/logos/pg.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 2, star: true, name: "Unilever", logo: "/images/logos/unilever.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 3, star: false, name: "Mondelez Intl", logo: "/images/logos/mondelez.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 4, star: false, name: "Pepsi Co.", logo: "/images/logos/pepsi.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 5, star: false, name: "Auchan", logo: "/images/logos/cocacola.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 6, star: false, name: "Norven", logo: "/images/logos/pepsi.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 7, star: false, name: "iHerb", logo: "/images/logos/pg.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 8, star: false, name: "Telegram", logo: "/images/logos/unilever.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 9, star: false, name: "Meta", logo: "/images/logos/mondelez.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 10, star: false, name: "Coca Cola", logo: "/images/logos/cocacola.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 11, star: false, name: "Procter & Gamble", logo: "/images/logos/pg.png", sector: "Consumer Staples", purchase: "02/24" },
];

const INDICATORS = ["up", "down", "flat"];

function seededIndicator(rowIdx, colIdx) {
  return INDICATORS[(rowIdx * 5 + colIdx * 3) % INDICATORS.length];
}

const EARNINGS_DATA = [
  { id: 0, star: true, name: "Coca Cola", logo: "/images/logos/cocacola.png", sector: "Consumer Staples", printDate: "02/24", period: "Q1 24", headline: "Some headline" },
  { id: 1, star: false, name: "Procter & Gamble", logo: "/images/logos/pg.png", sector: "Consumer Staples", printDate: "02/24", period: "Q1 24", headline: "Some headline" },
  { id: 2, star: true, name: "Unilever", logo: "/images/logos/unilever.png", sector: "Consumer Staples", printDate: "02/24", period: "Q2 24", headline: "Some headline" },
  { id: 3, star: false, name: "Mondelez Intl", logo: "/images/logos/mondelez.png", sector: "Consumer Staples", printDate: "02/24", period: "Q3 24", headline: "Some headline" },
  { id: 4, star: false, name: "Pepsi Co.", logo: "/images/logos/pepsi.png", sector: "Consumer Staples", printDate: "02/24", period: "Q4 24", headline: "Some headline" },
  { id: 5, star: false, name: "Auchan", logo: "/images/logos/cocacola.png", sector: "Consumer Staples", printDate: "02/24", period: "Q1 25", headline: "Some headline" },
  { id: 6, star: false, name: "Norven", logo: "/images/logos/pepsi.png", sector: "Consumer Staples", printDate: "02/24", period: "Q1 25", headline: "Some headline" },
  { id: 7, star: false, name: "iHerb", logo: "/images/logos/pg.png", sector: "Consumer Staples", printDate: "02/24", period: "Q1 25", headline: "Some headline" },
  { id: 8, star: false, name: "Telegram", logo: "/images/logos/unilever.png", sector: "Consumer Staples", printDate: "02/24", period: "Q1 24", headline: "Some headline" },
  { id: 9, star: false, name: "Meta", logo: "/images/logos/mondelez.png", sector: "Consumer Staples", printDate: "02/24", period: "Q2 24", headline: "Some headline" },
  { id: 10, star: false, name: "Coca Cola", logo: "/images/logos/cocacola.png", sector: "Consumer Staples", printDate: "02/24", period: "Q3 24", headline: "Some headline" },
  { id: 11, star: false, name: "Procter & Gamble", logo: "/images/logos/pg.png", sector: "Consumer Staples", printDate: "02/24", period: "Q4 24", headline: "Some headline" },
];

const DATE_FIELDS = ["initial", "thesis", "esg", "checklist", "meeting", "spokeTo", "spokeT"];
const INDICATOR_FIELDS = ["result", "guidance", "marketReaction", "guinnessReaction"];

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
      <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${styles[type]}`}>
        <Image src={src[type]} alt={type} width={10} height={10} />
      </div>
    );
  }
  return <span className="text-gn-gray">-</span>;
}

export default function PortfolioPage() {
  const [mainTab, setMainTab] = useState("Dashboard");
  const [subTab, setSubTab] = useState("Portfolio");
  const [dashData, setDashData] = useState(DASHBOARD_DATA);
  const [earnData, setEarnData] = useState(EARNINGS_DATA);

  const currentData = mainTab === "Earnings" ? earnData : dashData;
  const setCurrentData = mainTab === "Earnings" ? setEarnData : setDashData;
  const { sorted, sortKey, sortDir, requestSort } = useSortableData(currentData);

  const toggleStar = (id) => {
    setCurrentData((prev) => prev.map((row) => row.id === id ? { ...row, star: !row.star } : row));
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-4 flex items-center gap-1 text-[12px] text-gn-gray">
        <Home size={14} />
        <ChevronRight size={14} />
        <span>Portfolio View</span>
        <ChevronRight size={14} />
        <span>Dashboard</span>
        <ChevronRight size={14} />
        <span className="text-gn-text">Portfolio</span>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-6 border-b border-[#efeff0]">
          {MAIN_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setMainTab(tab)}
              className={`pb-2 text-[14px] font-medium transition-colors ${
                mainTab === tab
                  ? "border-b-2 border-gn-primary text-gn-primary"
                  : "text-gn-gray hover:text-gn-text"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-gn-red px-4 py-2 text-[13px] font-medium text-white">
          Global Equity Income
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-2 rounded-lg bg-[#EFF3F9] p-1">
            {SUB_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setSubTab(tab)}
                className={`rounded-lg px-4 py-1.5 text-[13px] font-medium transition-colors ${
                  subTab === tab
                    ? "bg-white text-gn-primary shadow-sm"
                    : "text-gn-gray hover:text-gn-text"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {mainTab === "Earnings" && (
            <button className="flex items-center gap-2 rounded-lg border border-[#efeff0] px-3 py-1.5 text-[13px] font-medium text-gn-text hover:bg-gray-50">
              <CalendarDays size={14} />
              Q1 - Q3, 2025
              <ChevronDown size={14} />
            </button>
          )}
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-gn-primary px-4 py-1.5 text-[13px] font-medium text-gn-primary hover:bg-gray-50">
            <Settings2 size={14} />
            Customize
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-gn-primary px-4 py-1.5 text-[13px] font-medium text-white hover:bg-gn-primary-dark">
            <Settings size={14} />
            Manage
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-lg border border-[#efeff0] bg-white">
        {mainTab === "Earnings" ? (
          <EarningsTable sorted={sorted} sortKey={sortKey} sortDir={sortDir} requestSort={requestSort} toggleStar={toggleStar} />
        ) : (
          <DashboardTable sorted={sorted} sortKey={sortKey} sortDir={sortDir} requestSort={requestSort} toggleStar={toggleStar} />
        )}
      </div>
    </div>
  );
}

function DashboardTable({ sorted, sortKey, sortDir, requestSort, toggleStar }) {
  return (
    <table className="w-full text-left text-[13px]">
      <thead className="sticky top-0 bg-white">
        <tr className="border-b border-[#efeff0] text-[12px] text-gn-gray">
          <th className="w-8 px-3 pb-3 pt-3" />
          <SortableHeader label="Global Equity Income" sortKey="name" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <SortableHeader label="Sector" sortKey="sector" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <SortableHeader label="Purchase" sortKey="purchase" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <th className="px-3 pb-3 pt-3 font-medium">Analyst</th>
          <th className="px-3 pb-3 pt-3 font-medium">Model</th>
          <SortableHeader label="Initial Review" sortKey="initial" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <SortableHeader label="Invest. Thesis" sortKey="thesis" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <SortableHeader label="ESG Review" sortKey="esg" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <SortableHeader label="Checklist" sortKey="checklist" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <SortableHeader label="Company Meeting" sortKey="meeting" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <SortableHeader label="Spoke to MGT" sortKey="spokeTo" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <SortableHeader label="Spoke t MGT" sortKey="spokeT" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
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
                <span className="font-medium text-gn-text">{row.name}</span>
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
            {DATE_FIELDS.map((field, colIdx) => (
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

function EarningsTable({ sorted, sortKey, sortDir, requestSort, toggleStar }) {
  return (
    <table className="w-full text-left text-[13px]">
      <thead className="sticky top-0 bg-white">
        <tr className="border-b border-[#efeff0] text-[12px] text-gn-gray">
          <th className="w-8 px-3 pb-3 pt-3" />
          <SortableHeader label="Global Equity Income" sortKey="name" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <SortableHeader label="Sector" sortKey="sector" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <SortableHeader label="Print Date" sortKey="printDate" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <th className="px-3 pb-3 pt-3 font-medium">Analyst</th>
          <th className="px-3 pb-3 pt-3 font-medium">Earnings</th>
          <SortableHeader label="Period" sortKey="period" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <th className="px-3 pb-3 pt-3 font-medium">Result</th>
          <th className="px-3 pb-3 pt-3 font-medium">Guidance</th>
          <th className="px-3 pb-3 pt-3 font-medium">Market Reaction</th>
          <th className="px-3 pb-3 pt-3 font-medium">Guiness Reaction</th>
          <SortableHeader label="Earnings Headline" sortKey="headline" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
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
                <span className="font-medium text-gn-text">{row.name}</span>
              </div>
            </td>
            <td className="px-3 py-3 text-gn-gray">{row.sector}</td>
            <td className="px-3 py-3 text-gn-gray">{row.printDate}</td>
            <td className="px-3 py-3">
              <Image src="/images/table-avatar2.png" alt="Analyst" width={26} height={26} className="rounded-full object-cover" />
            </td>
            <td className="px-3 py-3">
              <button className="text-gn-gray hover:text-gn-primary"><ExternalLink size={16} /></button>
            </td>
            <td className="px-3 py-3 text-gn-text">{row.period}</td>
            {INDICATOR_FIELDS.map((field, colIdx) => (
              <td key={field} className="px-3 py-3">
                <Indicator type={seededIndicator(rowIdx, colIdx)} />
              </td>
            ))}
            <td className="px-3 py-3 text-gn-gray">{row.headline}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
