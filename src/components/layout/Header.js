"use client";

import Image from "next/image";
import { Search, Bell, Star, MoreHorizontal } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-[60px] shrink-0 items-center justify-between border-b border-[#efeff0] bg-white px-5">
      <div className="flex h-9 w-[320px] items-center gap-2 rounded-lg border border-[#efeff0] bg-gn-input px-[9px]">
        <Search size={16} className="text-gn-gray" />
        <input
          type="text"
          placeholder="Search for stocks by name, ticker, etc."
          className="flex-1 bg-transparent text-[13px] font-medium tracking-[-0.26px] text-gn-text outline-none placeholder:text-[#7d7d8a]"
        />
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-[14px]">
          <button className="text-gn-text hover:text-gn-primary">
            <Bell size={18} />
          </button>
          <button className="text-gn-text hover:text-gn-primary">
            <Star size={18} />
          </button>
        </div>

        <div className="h-[30px] w-px bg-[#efeff0]" />

        <div className="flex items-center gap-4">
          <Image
            src="/images/avatar.png"
            alt="User avatar"
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
          <button className="text-gn-text hover:text-gn-primary">
            <MoreHorizontal size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
