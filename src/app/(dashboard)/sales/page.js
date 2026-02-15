"use client";

import { useState } from "react";
import {
  Home,
  ChevronRight,
  Search,
  Plus,
  ExternalLink,
  FileText,
  X,
  Calendar,
  ChevronDown,
  Link as LinkIcon,
  AlignLeft,
} from "lucide-react";
import SortableHeader, { useSortableData } from "@/components/ui/SortableHeader";

const SALES_NOTES = [
  { id: 0, date: "20.03.25", title: "Diageo Write-up", summary: "This project explores data-driven methods to visualize and interpret thesis results, providing insights through dynamic charts and visual storytelling." },
  { id: 1, date: "20.03.25", title: "Project 2 (by Tom Sherwood)", summary: "This project explores data-driven methods to visualize and interpret thesis results, providing insights through dynamic charts and visual storytelling." },
  { id: 2, date: "20.03.25", title: "Project 3 (by Tom Sherwood)", summary: "This project explores data-driven methods to visualize and interpret thesis results, providing insights through dynamic charts and visual storytelling." },
  { id: 3, date: "20.03.25", title: "Project 4 (by Tom Sherwood)", summary: "This project explores data-driven methods to visualize and interpret thesis results, providing insights through dynamic charts and visual storytelling." },
  { id: 4, date: "20.03.25", title: "Project 5 (by Tom Sherwood)", summary: "This project explores data-driven methods to visualize and interpret thesis results, providing insights through dynamic charts and visual storytelling." },
  { id: 5, date: "20.03.25", title: "Project 6 (by Tom Sherwood)", summary: "This project explores data-driven methods to visualize and interpret thesis results, providing insights through dynamic charts and visual storytelling." },
  { id: 6, date: "20.03.25", title: "Project 7 (by Tom Sherwood)", summary: "This project explores data-driven methods to visualize and interpret thesis results, providing insights through dynamic charts and visual storytelling." },
  { id: 7, date: "20.03.25", title: "Diageo Write-up", summary: "This project explores data-driven methods to visualize and interpret thesis results, providing insights through dynamic charts and visual storytelling." },
  { id: 8, date: "20.03.25", title: "Project 2 (by Tom Sherwood)", summary: "This project explores data-driven methods to visualize and interpret thesis results, providing insights through dynamic charts and visual storytelling." },
];

export default function SalesViewPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { sorted, sortKey, sortDir, requestSort } = useSortableData(SALES_NOTES);

  const filtered = sorted.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-4 flex items-center gap-1 text-[12px] text-gn-gray">
        <Home size={14} />
        <ChevronRight size={14} />
        <span className="text-gn-text">Sales View</span>
      </div>

      <div className="flex-1 rounded-lg border border-[#efeff0] bg-white">
        <div className="flex items-center justify-between px-5 pt-4 pb-4">
          <div className="flex items-center gap-1.5">
            <FileText size={18} className="text-gn-text" />
            <h2 className="text-[15px] font-semibold text-gn-text">Sales Notes</h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-[32px] w-[240px] items-center gap-2 rounded-lg border border-[#efeff0] bg-gn-input px-2.5">
              <Search size={16} className="text-gn-gray" />
              <input
                type="text"
                placeholder="Search for sales notes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-[13px] text-gn-text outline-none placeholder:text-gn-gray"
              />
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex h-[32px] items-center gap-2 rounded-lg bg-gn-primary px-4 text-[13px] font-medium text-white hover:bg-gn-primary-dark"
            >
              <Plus size={14} />
              Add Note
            </button>
          </div>
        </div>

        <div className="overflow-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-t border-[#efeff0] text-[11px] text-gn-gray">
                <SortableHeader label="Date" sortKey="date" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="w-[80px] px-4 py-2" />
                <SortableHeader label="Title" sortKey="title" activeSortKey={sortKey} sortDir={sortDir} onSort={requestSort} className="w-[240px] px-4 py-2" />
                <th className="px-4 py-2 font-medium">Summary</th>
                <th className="w-[54px] px-4 py-2" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((note) => (
                <tr
                  key={note.id}
                  className="border-b border-[#efeff0] transition-colors hover:bg-gray-50"
                >
                  <td className="px-4 py-3 text-[14px] text-gn-text">{note.date}</td>
                  <td className="px-4 py-3 text-[14px] text-gn-text">{note.title}</td>
                  <td className="px-4 py-3 text-[14px] leading-[22px] text-gn-gray">{note.summary}</td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-gn-gray hover:text-gn-primary">
                      <ExternalLink size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && <CreateNoteModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function CreateNoteModal({ onClose }) {
  const [dueDate, setDueDate] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [link, setLink] = useState("https://guinnessam.sharepoint.com/sites/");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="w-[480px] rounded-xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-[18px] font-semibold text-gn-text">Create New Sales Note</h3>
          <button onClick={onClose} className="text-gn-gray hover:text-gn-text">
            <X size={20} />
          </button>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-[13px] font-medium text-gn-text">Due Date</label>
          <div className="flex h-[40px] items-center gap-2 rounded-lg border border-[#efeff0] bg-gn-input px-3">
            <Calendar size={16} className="text-gn-gray" />
            <input
              type="text"
              placeholder="Select date and time"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              onFocus={(e) => { e.target.type = "datetime-local"; }}
              onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
              className="flex-1 bg-transparent text-[13px] text-gn-text outline-none placeholder:text-gn-gray"
            />
            <ChevronDown size={16} className="text-gn-primary" />
          </div>
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-[13px] font-medium text-gn-text">Title</label>
          <input
            type="text"
            placeholder="Write a subject"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-[40px] w-full rounded-lg border border-[#efeff0] bg-gn-input px-3 text-[13px] text-gn-text outline-none placeholder:text-gn-gray focus:border-gn-primary"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1.5 block text-[13px] font-medium text-gn-text">Summary</label>
          <textarea
            placeholder="Description of task"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            rows={4}
            className="w-full resize-none rounded-lg border border-[#efeff0] bg-gn-input px-3 py-2.5 text-[13px] text-gn-text outline-none placeholder:text-gn-gray focus:border-gn-primary"
          />
          <div className="mt-1 flex items-center gap-3">
            <button className="text-gn-gray hover:text-gn-text">
              <AlignLeft size={16} />
            </button>
            <button className="text-[13px] font-semibold text-gn-gray hover:text-gn-text">AA</button>
            <button className="text-[13px] text-gn-gray hover:text-gn-text">A</button>
          </div>
        </div>

        <div className="mb-6">
          <label className="mb-1.5 block text-[13px] font-medium text-gn-text">Link</label>
          <div className="flex h-[40px] items-center gap-2 rounded-lg border border-[#efeff0] bg-gn-input px-3">
            <LinkIcon size={16} className="shrink-0 text-gn-gray" />
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="flex-1 bg-transparent text-[13px] text-blue-600 underline outline-none placeholder:text-gn-gray placeholder:no-underline"
              placeholder="Paste a link"
            />
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer" className="shrink-0 text-gn-gray hover:text-gn-primary">
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="h-[40px] rounded-lg border border-[#efeff0] px-6 text-[13px] font-medium text-gn-text hover:bg-gray-50"
          >
            Cancel
          </button>
          <button className="h-[40px] rounded-lg bg-gn-primary px-6 text-[13px] font-medium text-white hover:bg-gn-primary-dark">
            Create Note
          </button>
        </div>
      </div>
    </div>
  );
}
