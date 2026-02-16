"use client";

import { useState } from "react";
import { useSortableData } from "@/components/ui/SortableHeader";
import PortfolioTable from "../PortfolioTable";
import { DASHBOARD_DATA, DASHBOARD_DATE_FIELDS } from "../data";

const HEADERS = {
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

export default function PortfolioDashboardPage() {
  const [data, setData] = useState(DASHBOARD_DATA);
  const { sorted, sortKey, sortDir, requestSort } = useSortableData(data);

  const toggleStar = (id) => {
    setData((prev) => prev.map((row) => row.id === id ? { ...row, star: !row.star } : row));
  };

  return (
    <PortfolioTable
      sorted={sorted}
      sortKey={sortKey}
      sortDir={sortDir}
      requestSort={requestSort}
      toggleStar={toggleStar}
      dateFields={DASHBOARD_DATE_FIELDS}
      headers={HEADERS}
    />
  );
}
