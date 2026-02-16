"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ChevronDown,
  Settings2,
  Settings,
  CalendarDays,
  Download,
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";

const MAIN_TABS = [
  { label: "Dashboard", href: "/portfolio/dashboard" },
  { label: "Priorities", href: "/portfolio/priorities" },
  { label: "Earnings", href: "/portfolio/earnings" },
  { label: "Calendars", href: "/portfolio/calendars" },
  { label: "NAVs", href: "/portfolio/navs" },
  { label: "Documents", href: "/portfolio/documents" },
  { label: "Fund", href: "/portfolio/fund" },
];

const SUB_TABS = ["Portfolio", "Watchlist", "Legacy"];

export default function PortfolioLayout({ children }) {
  const pathname = usePathname();
  const [subTab, setSubTab] = useState("Portfolio");
  const activeTab = MAIN_TABS.find((t) => pathname.startsWith(t.href))?.label || "Dashboard";
  const isEarnings = pathname.startsWith("/portfolio/earnings");

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col overflow-hidden rounded-lg bg-white p-5">
        <Breadcrumb items={["Portfolio View", activeTab, subTab]} />
        <div className="mb-4 flex items-center justify-between border-b border-[#efeff0]">
          <div className="flex gap-6 h-full">
            {MAIN_TABS.map((tab) => (
              <Link
                key={tab.label}
                href={tab.href}
                className={`pb-2 text-[14px] font-medium transition-colors ${
                  pathname.startsWith(tab.href)
                    ? "border-b-2 border-gn-primary text-gn-primary"
                    : "text-gn-gray hover:text-gn-text"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
          <button className="flex items-center gap-2 rounded-lg text-red-600 px-4 py-2 text-[13px] font-medium">
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
            {isEarnings && (
              <>
                <button className="flex items-center gap-2 rounded-lg border border-[#efeff0] px-3 py-1.5 text-[13px] font-medium text-gn-text hover:bg-gray-50">
                  <CalendarDays size={14} />
                  Q3
                  <ChevronDown size={14} />
                </button>
                <button className="flex items-center gap-2 rounded-lg border border-[#efeff0] px-3 py-1.5 text-[13px] font-medium text-gn-text hover:bg-gray-50">
                  <CalendarDays size={14} />
                  2025
                  <ChevronDown size={14} />
                </button>
              </>
            )}
          </div>
          <div className="flex gap-2">
            {isEarnings && (
              <button className="flex items-center gap-2 rounded-lg border border-gn-primary px-4 py-1.5 text-[13px] font-medium text-gn-primary hover:bg-gray-50">
                <Download size={14} />
                Export
              </button>
            )}
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

        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
