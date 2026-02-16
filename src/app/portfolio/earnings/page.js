"use client";

import { useState } from "react";
import { useSortableData } from "@/components/ui/SortableHeader";
import EarningsTable from "../EarningsTable";
import { EARNINGS_DATA } from "../data";

export default function PortfolioEarningsPage() {
  const [data, setData] = useState(EARNINGS_DATA);
  const { sorted, sortKey, sortDir, requestSort } = useSortableData(data);

  const toggleStar = (id) => {
    setData((prev) => prev.map((row) => row.id === id ? { ...row, star: !row.star } : row));
  };

  return (
    <EarningsTable
      sorted={sorted}
      sortKey={sortKey}
      sortDir={sortDir}
      requestSort={requestSort}
      toggleStar={toggleStar}
    />
  );
}
