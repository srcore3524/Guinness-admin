"use client";

import { useState, useMemo } from "react";
import { ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-react";

export function useSortableData(data, defaultKey = null, defaultDir = "asc") {
  const [sortKey, setSortKey] = useState(defaultKey);
  const [sortDir, setSortDir] = useState(defaultDir);

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortKey] ?? "";
      const bVal = b[sortKey] ?? "";
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  function requestSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  return { sorted, sortKey, sortDir, requestSort };
}

export default function SortableHeader({ label, sortKey, activeSortKey, sortDir, onSort, className = "" }) {
  const isActive = sortKey === activeSortKey;

  return (
    <th
      className={`cursor-pointer select-none whitespace-nowrap font-medium ${className}`}
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center gap-1">
        {label}
        {isActive ? (
          sortDir === "asc" ? (
            <ChevronUp size={14} />
          ) : (
            <ChevronDown size={14} />
          )
        ) : (
          <ChevronsUpDown size={14} className="opacity-40" />
        )}
      </div>
    </th>
  );
}
