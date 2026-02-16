"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Settings2,
  FileText,
  Search,
  Save,
  ArrowDownUp,
  Filter,
  Trash2,
  Upload,
  Calendar,
  BarChart3,
  CandlestickChart,
  Maximize2,
  Users,
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { FUND_CATEGORIES, STOCK_DETAILS, DEFAULT_DETAIL, CHART_DATA } from "./data";

export default function StockPage() {
  const [openFunds, setOpenFunds] = useState({ 0: true });
  const [selectedStock, setSelectedStock] = useState("cocacola");
  const [chartTab, setChartTab] = useState("1Y");
  const [chartDate, setChartDate] = useState("2025-09-04");

  const toggleFund = (idx) => {
    setOpenFunds((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const stockEntry = FUND_CATEGORIES.flatMap((f) => f.stocks).find((s) => s.id === selectedStock);
  const selectedFund = FUND_CATEGORIES.find((f) => f.stocks.some((s) => s.id === selectedStock))?.name || "Global Equity Income";

  const detail = STOCK_DETAILS[selectedStock] || {
    ...DEFAULT_DETAIL,
    fullName: stockEntry?.name || DEFAULT_DETAIL.fullName,
    ticker: stockEntry?.ticker || DEFAULT_DETAIL.ticker,
    logo: stockEntry?.logo || DEFAULT_DETAIL.logo,
    tags: [{ label: selectedFund, color: "blue" }],
  };

  return (
    <div className="flex flex-1 gap-4 overflow-hidden rounded-lg bg-[#F2F5F9] p-5">
      <StockSidebar
          openFunds={openFunds}
          toggleFund={toggleFund}
          selectedStock={selectedStock}
          onSelect={setSelectedStock}
        />
        <StockDetail
          detail={detail}
          chartTab={chartTab}
          setChartTab={setChartTab}
          chartDate={chartDate}
          setChartDate={setChartDate}
          selectedFund={selectedFund}
        />
      </div>
  );
}

function StockSidebar({ openFunds, toggleFund, selectedStock, onSelect }) {
  return (
    <div className="flex w-[240px] shrink-0 flex-col rounded-lg border border-[#efeff0] bg-white">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <h2 className="text-[16px] font-semibold text-gn-text">Stock View</h2>
        <button className="text-gn-gray hover:text-gn-text">
          <Settings2 size={16} />
        </button>
      </div>
      <div className="h-px bg-[#efeff0] mx-4" />
      <div className="flex-1 overflow-auto px-4 py-3">
        {FUND_CATEGORIES.map((fund, idx) => (
          <div key={fund.name} className="mb-2">
            <button
              onClick={() => toggleFund(idx)}
              className="flex w-full items-center justify-between py-2 text-[13px] font-semibold text-gn-primary"
            >
              {fund.name}
              {openFunds[idx] ? <ChevronUp size={16} className="text-gn-red" /> : <ChevronDown size={16} className="text-gn-red" />}
            </button>
            {openFunds[idx] && (
              <div className="flex flex-col">
                {fund.stocks.map((stock) => {
                  const isActive = selectedStock === stock.id;
                  return (
                    <button
                      key={stock.id}
                      onClick={() => onSelect(stock.id)}
                      className={`border-l-2 py-1.5 pl-3 text-left text-[13px] transition-colors ${
                        isActive
                          ? "border-l-gn-red font-medium text-gn-red"
                          : "border-l-transparent text-gn-text hover:text-gn-primary"
                      }`}
                    >
                      {stock.name}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function StockDetail({ detail, chartTab, setChartTab, chartDate, setChartDate, selectedFund }) {
  return (
    <div className="flex flex-1 flex-col gap-2 min-h-0">
      <Breadcrumb items={[
        { label: "Stock View", href: "/stock" },
        { label: selectedFund, href: "/stock" },
        detail.fullName,
      ]} />

      <div className="main-scroll flex flex-1 flex-col gap-2 overflow-auto">
      <div className="rounded-lg border border-[#efeff0] bg-white p-5">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Image src={detail.logo} alt={detail.fullName} width={48} height={48} className="rounded-full" />
            <div>
              <h1 className="text-[20px] font-semibold text-gn-text">{detail.fullName}</h1>
              <div className="mt-1 flex gap-2">
                {detail.tags.map((tag) => {
                  const colors = {
                    blue: "border-blue-500 text-blue-600 bg-blue-50",
                    orange: "border-orange-400 text-orange-500 bg-orange-50",
                  };
                  return (
                    <span key={tag.label} className={`rounded-full border px-3 py-0.5 text-[11px] font-medium ${colors[tag.color] || colors.blue}`}>
                      {tag.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-gn-primary px-4 py-2 text-[13px] font-medium text-white hover:bg-gn-primary-dark">
            <Users size={14} />
            Select Team
            <ChevronDown size={14} />
          </button>
        </div>

        <div className="flex gap-8 text-[13px]">
          <div>
            <div className="text-gn-gray">Category</div>
            <div className="font-medium text-gn-text">{detail.category}</div>
          </div>
          <div>
            <div className="text-gn-gray">Market Cap</div>
            <div className="font-medium text-green-600">▲ {detail.marketCap}</div>
          </div>
          <div>
            <div className="text-gn-gray">Bought</div>
            <div className="font-medium text-gn-text">{detail.bought}</div>
          </div>
          <div>
            <div className="text-gn-gray">New Date</div>
            <div className="font-medium text-gn-text">{detail.newDate}</div>
          </div>
          <div>
            <div className="text-gn-gray">Analyst</div>
            <div className="flex items-center gap-2 font-medium text-gn-text">
              <Image src="/images/table-avatar2.png" alt="Analyst" width={24} height={24} className="rounded-full" />
              {detail.analyst}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-[#efeff0] bg-white p-5">
        <div className="mb-2 text-[13px] font-semibold text-gn-text">Thesis Summary</div>
        <p className="text-[12px] leading-[18px] text-gn-gray">{detail.thesisSummary}</p>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <CoreNotes notes={detail.coreNotes} />
          <Earnings earnings={detail.earnings} />
        </div>
        <div className="flex-1">
          <StockPrice detail={detail} chartTab={chartTab} setChartTab={setChartTab} chartDate={chartDate} setChartDate={setChartDate} />
        </div>
      </div>
      </div>
    </div>
  );
}

function CoreNotes({ notes }) {
  return (
    <div className="rounded-lg border border-[#efeff0] bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-1.5">
          <FileText size={16} className="text-gn-text" />
          <span className="text-[14px] font-semibold text-gn-text">Core Notes</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gn-gray hover:text-gn-text"><Search size={14} /></button>
          <button className="text-gn-gray hover:text-gn-text"><Save size={14} /></button>
          <button className="text-gn-gray hover:text-gn-text"><ArrowDownUp size={14} /></button>
          <button className="text-gn-gray hover:text-gn-text"><Filter size={14} /></button>
          <button className="text-gn-gray hover:text-gn-text"><Trash2 size={14} /></button>
        </div>
      </div>
      <table className="w-full text-[12px]">
        <thead>
          <tr className="border-t border-b border-[#efeff0] text-gn-gray">
            <th className="px-4 py-2 text-left font-medium">Document</th>
            <th className="px-4 py-2 text-left font-medium">Date</th>
            <th className="px-4 py-2 text-left font-medium">Month Since</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note, i) => (
            <tr key={i} className="border-b border-[#efeff0] transition-colors hover:bg-gray-50">
              <td className="px-4 py-2.5">
                <div className="flex items-center gap-2 text-gn-text">
                  <FileText size={14} className="shrink-0 text-gn-gray" />
                  {note.document}
                </div>
              </td>
              <td className="px-4 py-2.5 text-gn-text">{note.date}</td>
              <td className="px-4 py-2.5 text-gn-gray">{note.monthSince}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
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

function Earnings({ earnings }) {
  return (
    <div className="rounded-lg border border-[#efeff0] bg-white">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-1.5">
          <BarChart3 size={16} className="text-gn-text" />
          <span className="text-[14px] font-semibold text-gn-text">Earnings</span>
        </div>
        <button className="flex items-center gap-1.5 text-[12px] text-gn-gray hover:text-gn-text">
          <Upload size={14} />
          Upload
        </button>
      </div>
      <table className="w-full text-[12px]">
        <thead>
          <tr className="border-t border-b border-[#efeff0] text-gn-gray">
            <th className="px-4 py-2 text-left font-medium">Period</th>
            <th className="px-4 py-2 text-center font-medium">Result</th>
            <th className="px-4 py-2 text-center font-medium">Guidance</th>
            <th className="px-4 py-2 text-center font-medium">Market<br />Reaction</th>
            <th className="px-4 py-2 text-center font-medium">Guinness<br />Reaction</th>
          </tr>
        </thead>
        <tbody>
          {earnings.map((row, i) => (
            <tr key={i} className="border-b border-[#efeff0] transition-colors hover:bg-gray-50">
              <td className="px-4 py-2.5 text-gn-text">{row.period}</td>
              <td className="px-4 py-2.5"><div className="flex justify-center"><Indicator type={row.result} /></div></td>
              <td className="px-4 py-2.5"><div className="flex justify-center"><Indicator type={row.guidance} /></div></td>
              <td className="px-4 py-2.5"><div className="flex justify-center"><Indicator type={row.marketReaction} /></div></td>
              <td className="px-4 py-2.5"><div className="flex justify-center"><Indicator type={row.guinnessReaction} /></div></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-lg border border-[#efeff0] bg-white px-3 py-2 text-[12px] shadow-md">
      <div className="mb-1 font-medium text-gn-text">{d.date}</div>
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        <span className="text-gn-gray">Price:</span>
        <span className="font-medium text-gn-text">${d.price.toFixed(2)}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-gray-300" />
        <span className="text-gn-gray">Vol:</span>
        <span className="font-medium text-gn-text">89,425,231</span>
      </div>
    </div>
  );
}

function ReportDot(props) {
  const { cx, cy, payload } = props;
  if (!payload.report) return null;
  return (
    <g>
      <rect x={cx - 9} y={cy - 9} width={18} height={18} rx={4} ry={4} fill="#20305C" />
      <text x={cx} y={cy + 1} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize={9} fontWeight={600}>R</text>
    </g>
  );
}

const CHART_TABS = ["1D", "1M", "1Y", "5Y", "ALL"];
const CHART_SLICE = { "1D": 3, "1M": 13, "1Y": 50, "5Y": 0, "ALL": 0 };

const MONTH_MAP = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };

function toISO(dateStr) {
  const [mon, day] = dateStr.split(" ");
  const m = MONTH_MAP[mon];
  const year = Number(m) >= 10 ? "2024" : "2025";
  return `${year}-${m}-${day.padStart(2, "0")}`;
}

function formatDateLabel(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function StockPrice({ detail, chartTab, setChartTab, chartDate, setChartDate }) {
  const dateRef = useRef(null);
  const sp = detail.stockPrice;
  const {
    ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
    CartesianGrid, Tooltip, ReferenceLine,
  } = require("recharts");

  const sliceCount = CHART_SLICE[chartTab] || 0;
  const slicedData = sliceCount > 0 ? CHART_DATA.slice(-sliceCount) : CHART_DATA;
  const filteredData = chartDate
    ? slicedData.filter((d) => toISO(d.date) <= chartDate)
    : slicedData;
  const lastPrice = filteredData[filteredData.length - 1]?.price;

  return (
    <div className="rounded-lg border border-[#efeff0] bg-white">
      <div className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          <BarChart3 size={16} className="text-gn-text" />
          <span className="text-[14px] font-semibold text-gn-text">Stock Price</span>
        </div>
      </div>
      <div className="border-t border-[#efeff0] px-4 py-4">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Image src={detail.logo} alt={detail.ticker} width={36} height={36} className="rounded-full" />
            <div>
              <div className="text-[14px] font-semibold text-gn-text">
                {detail.fullName} <span className="font-normal text-gn-gray">{detail.ticker}</span>
              </div>
              <div className="text-[11px] text-gn-gray">{sp.sector}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-baseline gap-2">
              <span className="font-semibold text-gn-text">{sp.price}</span>
              <span className="text-green-600">▲ {sp.change} [{sp.changePercent}]</span>
              <span>Today</span>
            </div>
            <div className="text-[10px] text-gn-gray">{sp.date}</div>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1 rounded-lg bg-[#EFF3F9] p-1">
              {CHART_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setChartTab(tab)}
                  className={`rounded-md px-3 py-1 text-[12px] font-medium transition-colors ${
                    chartTab === tab
                      ? "bg-white text-gn-primary shadow-sm"
                      : "text-gn-primary/60 hover:text-gn-primary"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              onClick={() => dateRef.current?.showPicker()}
              className="flex items-center gap-1.5 rounded-lg border border-[#efeff0] px-3 py-1 text-[12px] text-gn-text hover:bg-gray-50"
            >
              <Calendar size={12} />
              {formatDateLabel(chartDate)}
            </button>
            <input
              ref={dateRef}
              type="date"
              value={chartDate}
              onChange={(e) => { if (e.target.value) setChartDate(e.target.value); }}
              className="invisible absolute h-0 w-0"
              min="2024-10-01"
              max="2025-09-16"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <button className="flex items-center gap-1.5 rounded-lg border border-[#efeff0] px-3 py-1.5 text-[12px] text-gn-gray hover:text-gn-text">
              <Upload size={14} />
              Upload
            </button>
            <button className="flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-[#efeff0] text-gn-gray hover:text-gn-text">
              <Search size={14} />
            </button>
            <button className="flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-[#efeff0] text-gn-gray hover:text-gn-text">
              <CandlestickChart size={14} />
            </button>
            <button className="flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-[#efeff0] text-gn-gray hover:text-gn-text">
              <Maximize2 size={14} />
            </button>
          </div>
        </div>

        <div className="relative">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={filteredData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "#838593" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => v.split(" ")[0]}
              />
              <YAxis
                orientation="right"
                width={45}
                tick={{ fontSize: 10, fill: "#838593" }}
                tickLine={false}
                axisLine={false}
                domain={["dataMin - 5", "dataMax + 5"]}
                tickFormatter={(v) => v.toFixed(2)}
              />
              <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#9ca3af", strokeDasharray: "4 4" }} />
              <ReferenceLine y={lastPrice} stroke="#22c55e" strokeDasharray="3 3" strokeWidth={0.5} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#priceGradient)"
                dot={<ReportDot />}
                activeDot={{ r: 5, fill: "#22c55e", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
