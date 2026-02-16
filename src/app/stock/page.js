"use client";

import Breadcrumb from "@/components/ui/Breadcrumb";

export default function StockPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb items={["Stock View"]} />
      <div className="flex flex-1 items-center justify-center text-gn-gray">
        Stock View — Coming Soon
      </div>
    </div>
  );
}
