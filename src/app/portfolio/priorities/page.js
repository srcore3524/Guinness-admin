"use client";

import { useState } from "react";
import { useSortableData } from "@/components/ui/SortableHeader";
import PortfolioTable from "../PortfolioTable";
import { DASHBOARD_DATA, PRIORITIES_DATE_FIELDS } from "../data";

const HEADERS = {
  initialReview: <>Initial<br/>Review</>,
  investThesis: <>Invest.<br/>Thesis</>,
  esg: <>ESG<br/>Review</>,
  checklist: "Checklist",
  companyMeeting: <>Company<br/>Meeting</>,
  spokeToMgt: <>Spoke to<br/>MGT</>,
  teamDiscussion: <>Team<br/>Discussion</>,
  quarterlyEarning: <>Quarterly<br/>Earning</>,
};

export default function PortfolioPrioritiesPage() {
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
      dateFields={PRIORITIES_DATE_FIELDS}
      headers={HEADERS}
    />
  );
}
