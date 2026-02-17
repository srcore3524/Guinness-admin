"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Briefcase,
  ChartCandlestick,
  ChartNoAxesCombined,
  Users,
  Globe,
  CircleDollarSign,
  Monitor,
  Info,
  Upload,
  PanelLeftClose,
} from "lucide-react";

const MENU_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Portfolio View", href: "/portfolio", icon: Briefcase },
  { label: "Stock View", href: "/stock", icon: ChartCandlestick },
  { label: "Analyst View", href: "/analyst", icon: ChartNoAxesCombined },
  { label: "Team View", href: "/team", icon: Users, soon: true },
  { label: "Macro View", href: "/macro", icon: Globe, soon: true },
  { label: "Notebook View", href: "/notebook", icon: Monitor, soon: true },
  { label: "Sales View", href: "/sales", icon: CircleDollarSign },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-[260px] shrink-0 flex-col border-r border-[#efeff0] bg-white">
      <div className="flex h-[60px] items-center justify-between px-5">
        <Image
          src="/images/logo.svg"
          alt="Guinness Global Investors"
          width={113}
          height={24}
          priority
        />
        <button className="text-gn-gray hover:text-gn-text">
          <PanelLeftClose size={18} />
        </button>
      </div>

      <div className="flex justify-center px-5">
        <button className="flex items-center justify-center gap-2 rounded-lg bg-gn-primary px-4 py-2 text-[13px] font-medium tracking-[-0.26px] text-white hover:bg-gn-primary-dark">
          <Upload size={14} />
          Upload
        </button>
      </div>

      <div className="px-5 py-4">
        <div className="h-px w-full bg-[#efeff0]" />
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-5">
        {MENU_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);

          if (item.soon) {
            return (
              <span
                key={item.href}
                className="flex h-9 items-center gap-2 rounded-lg px-3 text-[13px] font-medium text-gn-gray/60 cursor-default"
              >
                <item.icon size={18} />
                {item.label}
                <span className="ml-auto rounded-full bg-gn-red/10 px-2.5 py-0.5 text-[11px] font-semibold text-gn-red">
                  Soon
                </span>
              </span>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex h-9 items-center gap-2 rounded-lg px-3 text-[13px] font-medium transition-colors ${
                isActive
                  ? "bg-gn-red/5 text-gn-red"
                  : "text-gn-text hover:bg-gray-50"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-5 py-4">
        <div className="h-px w-full bg-[#efeff0]" />
      </div>

      <div className="px-5 pb-5">
        <Link
          href="/help"
          className="flex h-9 items-center gap-2 rounded-lg px-3 text-[13px] font-medium text-gn-text hover:bg-gray-50"
        >
          <Info size={18} />
          Help &amp; Support
        </Link>
      </div>
    </aside>
  );
}
