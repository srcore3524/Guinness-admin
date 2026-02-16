"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  ExternalLink,
  Settings2,
  ChevronDown,
  Settings,
  CalendarDays,
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SortableHeader, { useSortableData } from "@/components/ui/SortableHeader";
import {
  MAIN_TABS, SUB_TABS, DATE_STYLES, DASHBOARD_DATA,
  INDICATORS, EARNINGS_DATA, DASHBOARD_DATE_FIELDS,
  PRIORITIES_DATE_FIELDS, INDICATOR_FIELDS,
} from "./data";

const DASHBOARD_HEADERS = {
  thesis1: "Thesis",
  thesis2: "Thesis",
  thesis3: "Thesis",
  esg: <>ESG<br/>Review</>,
  checklist: "Checklist",
  ggiMeeting: <>GGI<br/>Meeting</>,
  earnings: "Earnings",
  earningsQ1: <>Earnings<br/>(-1Q)</>,
  earningsQ2: <>Earnings<br/>(-2Q)</>,
  earningsQ3: <>Earnings<br/>(-3Q)</>,
};

const PRIORITIES_HEADERS = {
  initialReview: <>Initial<br/>Review</>,
  investThesis: <>Invest.<br/>Thesis</>,
  esg: <>ESG<br/>Review</>,
  checklist: "Checklist",
  companyMeeting: <>Company<br/>Meeting</>,
  spokeToMgt: <>Spoke to<br/>MGT</>,
  teamDiscussion: <>Team<br/>Discussion</>,
  quarterlyEarning: <>Quarterly<br/>Earning</>,
};

function seededStyle(rowIdx, colIdx) {
  return DATE_STYLES[(rowIdx * 7 + colIdx * 3) % DATE_STYLES.length];
}

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

  const dateFields = mainTab === "Priorities" ? PRIORITIES_DATE_FIELDS : DASHBOARD_DATE_FIELDS;
  const headers = mainTab === "Priorities" ? PRIORITIES_HEADERS : DASHBOARD_HEADERS;

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb items={["Portfolio View", mainTab, subTab]} />

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
          <PortfolioTable sorted={sorted} sortKey={sortKey} sortDir={sortDir} requestSort={requestSort} toggleStar={toggleStar} dateFields={dateFields} headers={headers} />
        )}
      </div>
    </div>
  );
}

function PortfolioTable({ sorted, sortKey, sortDir, requestSort, toggleStar, dateFields, headers }) {
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

function EarningsTable({ sorted, sortKey, sortDir, requestSort, toggleStar }) {
  return (
    <table className="w-full text-left text-[13px]">
      <thead className="sticky top-0 bg-white">
        <tr className="border-b border-[#efeff0] text-[12px] text-gn-gray">
          <th className="w-8 px-3 pb-3 pt-3" />
          <SortableHeader label={<>Global Equity<br/>Income</>} sortKey="name" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <SortableHeader label="Sector" sortKey="sector" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <SortableHeader label={<>Print<br/>Date</>} sortKey="printDate" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <th className="px-3 pb-3 pt-3 font-medium">Analyst</th>
          <th className="px-3 pb-3 pt-3 font-medium">Earnings</th>
          <SortableHeader label="Period" sortKey="period" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
          <th className="px-3 pb-3 pt-3 text-center font-medium">Result</th>
          <th className="px-3 pb-3 pt-3 text-center font-medium">Guidance</th>
          <th className="px-3 pb-3 pt-3 text-center font-medium">Market<br/>Reaction</th>
          <th className="px-3 pb-3 pt-3 text-center font-medium">Guiness<br/>Reaction</th>
          <SortableHeader label={<>Earnings<br/>Headline</>} sortKey="headline" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="px-3 pb-3 pt-3" />
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
                <div className="flex justify-center">
                  <Indicator type={seededIndicator(rowIdx, colIdx)} />
                </div>
              </td>
            ))}
            <td className="px-3 py-3 text-gn-gray">{row.headline}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
