"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Clock,
  FolderOpen,
  BarChart3,
  Plus,
  Star,
  ExternalLink,
  Settings,
  Settings2,
  X,
  Check,
} from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import SortableHeader, {
  useSortableData,
} from "@/components/ui/SortableHeader";
import {
  ANALYSTS,
  UPCOMING_DATES,
  INITIAL_PROJECTS,
  WEEKLY_TASKS,
  DAILY_TASKS as INITIAL_DAILY_TASKS,
  MONTHLY_EVENTS,
  COVERAGE_DATA,
  DATE_STYLES,
} from "./data";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const rows = [];
  let week = new Array(firstDay).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) {
      rows.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    rows.push(week);
  }
  return rows;
}

function MonthlyCalendar({ year, month, events }) {
  const rows = getCalendarDays(year, month);
  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;

  return (
    <div>
      <div className="flex">
        {DAYS.map((d) => (
          <div
            key={d}
            className={`flex-1 py-2 text-center text-[11px] font-medium ${d === "Sat" ? "text-gn-red" : "text-gn-gray"}`}
          >
            {d}
          </div>
        ))}
      </div>
      {rows.map((week, wi) => (
        <div key={wi} className="flex">
          {week.map((day, di) => (
            <div
              key={di}
              className="relative flex h-[26px] flex-1 items-center justify-center"
            >
              {day && (
                <>
                  <span
                    className={`text-[11px] ${
                      isCurrentMonth && day === today.getDate()
                        ? "font-bold text-gn-primary"
                        : "text-gn-text"
                    }`}
                  >
                    {day}
                  </span>
                  {events.includes(day) && (
                    <span className="absolute right-1 top-1 h-[4px] w-[4px] rounded-full bg-gn-red" />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const WEEKLY_CARD_STYLES = [
  "border-l-emerald-400 bg-emerald-50/60",
  "border-l-amber-400 bg-amber-50/60",
  "border-l-blue-400 bg-blue-50/60",
  "border-l-gn-red bg-red-50/60",
];

function WeeklyPlanner({ tasks }) {
  return (
    <div className="flex flex-col">
      {WEEKDAYS.map((day, di) => {
        const dayTasks = tasks[day] || [];
        const style = WEEKLY_CARD_STYLES[di % WEEKLY_CARD_STYLES.length];
        return (
          <div
            key={day}
            className="flex items-center gap-3 border-b border-[#efeff0] py-2.5 last:border-0"
          >
            <div className="w-[36px] shrink-0 text-[13px] font-semibold text-gn-primary">
              {day}
            </div>
            <div className="flex flex-1 items-center gap-1.5">
              {dayTasks.length === 0 ? (
                <span className="text-[12px] text-gn-gray">-</span>
              ) : (
                <>
                  <div className={`flex-1 rounded-lg border-l-[3px] px-2.5 py-2 text-[12px] text-gn-text ${style}`}>
                    {dayTasks[0].text}
                  </div>
                  {dayTasks.length > 1 && (
                    <div className={`shrink-0 rounded-lg px-2.5 py-2 text-[12px] border border-[#E4EBF5] bg-[#EFF3F9]`}>
                      +{dayTasks.length - 1}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const DAILY_CARD_STYLES = [
  "border-l-amber-400 bg-amber-50/60",
  "border-l-emerald-400 bg-emerald-50/60",
  "border-l-gn-red bg-red-50/60",
  "border-l-blue-400 bg-blue-50/60",
];

function DailyPlanner({ date, tasks }) {
  const dayTasks = tasks[date] || [];

  if (dayTasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-[12px] text-gn-gray">
        No plans for this day
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {dayTasks.map((task, i) => (
        <div
          key={task.id}
          className={`rounded-lg border-l-[3px] px-3 py-3 text-[12px] leading-relaxed text-gn-text ${DAILY_CARD_STYLES[i % DAILY_CARD_STYLES.length]}`}
        >
          {task.text}
        </div>
      ))}
    </div>
  );
}

function CreateProjectModal({ onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const dueDateRef = useRef(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[500px] rounded bg-white p-5 shadow-[0px_0px_12px_rgba(0,0,0,0.1),0px_4px_15px_rgba(0,0,0,0.15)]">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-[17px] font-bold text-gn-text">Create New Task</h3>
          <button onClick={onClose} className="text-gn-gray hover:text-gn-text">
            <X size={18} />
          </button>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-[11px] font-medium text-gn-gray">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name of task"
            className="w-full rounded-lg border border-[#E4EBF5] px-2 py-2 text-[12px] text-gn-text outline-none placeholder:text-gn-gray focus:border-gn-primary"
            autoFocus
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-[11px] font-medium text-gn-gray">
            Due Date
          </label>
          <button
            onClick={() => dueDateRef.current?.showPicker()}
            className="flex w-full items-center justify-between rounded-lg border border-[#E4EBF5] px-2 py-2 hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-gn-gray" />
              <span className={`text-[12px] ${dueDate ? "text-gn-text" : "text-gn-gray"}`}>
                {dueDate ? formatPlanDate(dueDate) : "Select date and time"}
              </span>
            </div>
            <ChevronDown size={16} className="text-gn-red" />
          </button>
          <input
            ref={dueDateRef}
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="invisible absolute h-0 w-0"
          />
        </div>

        <div className="mb-5">
          <label className="mb-1 block text-[11px] font-medium text-gn-gray">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description of task"
            rows={4}
            className="w-full resize-none rounded-lg border border-[#E4EBF5] px-3 pt-3 pb-8 text-[12px] text-gn-text outline-none placeholder:text-gn-gray focus:border-gn-primary"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="rounded-lg border border-gn-gray px-[18px] py-2.5 text-[13px] font-medium text-gn-gray hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (name.trim()) {
                onSubmit(name.trim());
                onClose();
              }
            }}
            disabled={!name.trim()}
            className="rounded-lg bg-gn-primary px-[18px] py-2.5 text-[13px] font-medium text-white hover:bg-gn-primary-dark disabled:opacity-50"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}

function formatPlanDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
}

function AddPlanModal({ onClose, onSubmit }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const dateRef = useRef(null);

  function addTask() {
    setTasks((prev) => [...prev, { id: Date.now(), text: `Task ${prev.length + 1}` }]);
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[500px] rounded bg-white p-5 shadow-[0px_0px_12px_rgba(0,0,0,0.1),0px_4px_15px_rgba(0,0,0,0.15)]">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-[17px] font-bold text-gn-text">Add a Plan</h3>
          <button onClick={onClose} className="text-gn-gray hover:text-gn-text">
            <X size={18} />
          </button>
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-[11px] font-medium text-gn-gray">
            Name
          </label>
          <button
            onClick={() => dateRef.current?.showPicker()}
            className="flex w-full items-center justify-between rounded-lg border border-[#E4EBF5] px-2 py-2 hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-gn-gray" />
              <span className={`text-[12px] ${selectedDate ? "text-gn-text" : "text-gn-gray"}`}>
                {selectedDate ? formatPlanDate(selectedDate) : "Select Day"}
              </span>
            </div>
            <ChevronDown size={16} className="text-gn-red" />
          </button>
          <input
            ref={dateRef}
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="invisible absolute h-0 w-0"
          />
        </div>

        <div className="mb-4">
          <label className="mb-1 block text-[11px] font-medium text-gn-gray">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full rounded-lg border border-[#E4EBF5] px-2 py-2 text-[12px] text-gn-text outline-none placeholder:text-gn-gray focus:border-gn-primary"
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-[11px] font-medium text-gn-gray">
            Tasks
          </label>
          {tasks.length > 0 && (
            <div className="mb-2 flex flex-col gap-1.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-lg border border-[#E4EBF5] px-2.5 py-1.5 text-[12px] text-gn-text"
                >
                  {task.text}
                  <button
                    onClick={() => removeTask(task.id)}
                    className="text-gn-gray hover:text-gn-red"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <button
            onClick={addTask}
            className="flex items-center gap-1 rounded-lg border border-gn-primary px-3 py-1 text-[11px] font-medium text-gn-primary hover:bg-gray-50"
          >
            <Plus size={12} />
            Add Task
          </button>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={onClose}
            className="rounded-lg border border-gn-gray px-[18px] py-2.5 text-[13px] font-medium text-gn-gray hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedDate) {
                onSubmit({ date: selectedDate, description, tasks });
                onClose();
              }
            }}
            disabled={!selectedDate}
            className="rounded-lg bg-gn-primary px-[18px] py-2.5 text-[13px] font-medium text-white hover:bg-gn-primary-dark disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AnalystPage() {
  const [selectedTeam, setSelectedTeam] = useState("Global Team");
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const [selectedAnalyst, setSelectedAnalyst] = useState(1);
  const [plannerView, setPlannerView] = useState("monthly");
  const [plannerDropdownOpen, setPlannerDropdownOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(7);
  const [calendarYear, setCalendarYear] = useState(2025);
  const [dailyDate, setDailyDate] = useState(25);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState("All");
  const [portfolioDropdownOpen, setPortfolioDropdownOpen] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [dailyTasks, setDailyTasks] = useState(INITIAL_DAILY_TASKS);

  function handleAddPlan({ date, description, tasks }) {
    const day = new Date(date + "T00:00:00").getDate();
    setDailyTasks((prev) => {
      const existing = prev[day] || [];
      const newTasks = [
        ...existing,
        { id: Date.now(), text: description || tasks.map((t) => t.text).join(", ") },
        ...tasks.map((t) => ({ ...t, id: Date.now() + t.id })),
      ].filter((t) => t.text);
      return { ...prev, [day]: newTasks };
    });
  }

  const { sorted: sortedCoverage, sortKey, sortDir, requestSort } =
    useSortableData(COVERAGE_DATA);

  function handleCreateProject(name) {
    setProjects((prev) => [
      { id: Date.now(), name, checked: false },
      ...prev,
    ]);
  }

  function toggleProject(id) {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, checked: !p.checked } : p))
    );
  }

  function prevMonth() {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else {
      setCalendarMonth((m) => m - 1);
    }
  }

  function nextMonth() {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else {
      setCalendarMonth((m) => m + 1);
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="main-scroll flex-1 overflow-y-auto p-4">
        <Breadcrumb items={["Analyst View"]} />

        <h1 className="mb-4 text-[20px] font-semibold text-gn-text">
          Analyst View
        </h1>

        {/* Select Team + Analyst */}
        <div className="mb-4 flex items-end gap-8">
          <div className="w-[240px]">
            <label className="mb-1 block text-[12px] text-gn-gray">
              Select Team
            </label>
            <div className="relative">
              <button
                onClick={() => setTeamDropdownOpen(!teamDropdownOpen)}
                className="flex w-full items-center justify-between rounded-lg border border-[#efeff0] bg-white px-3 py-2 text-[13px] font-medium text-gn-text hover:bg-gray-50"
              >
                {selectedTeam}
                <ChevronDown size={14} className="text-gn-red" />
              </button>
              {teamDropdownOpen && (
                <div className="absolute left-0 top-full z-20 mt-1 w-full rounded-lg border border-[#efeff0] bg-white py-1 shadow-lg">
                  {["Global Team", "US Team", "EU Team", "Asia Team"].map(
                    (team) => (
                      <button
                        key={team}
                        onClick={() => {
                          setSelectedTeam(team);
                          setTeamDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-[13px] hover:bg-gray-50 ${
                          team === selectedTeam
                            ? "font-medium text-gn-primary"
                            : "text-gn-text"
                        }`}
                      >
                        {team}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[12px] text-gn-gray">
              Select an Analyst
            </label>
            <div className="flex items-center gap-1">
              {ANALYSTS.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setSelectedAnalyst(a.id)}
                  className={`flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-[13px] font-medium transition-colors ${
                    selectedAnalyst === a.id
                      ? "border-gn-red bg-white text-gn-text"
                      : "border-transparent bg-white text-gn-gray hover:text-gn-text"
                  }`}
                >
                  <Image src={a.avatar} alt={a.name} width={24} height={24} className="rounded-full" />
                  {a.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top 3 Cards */}
        <div className="mb-4 grid grid-cols-[1fr_1.3fr_1.3fr] gap-3">
          {/* Planner */}
          <div className="rounded-xl border border-[#efeff0] bg-white">
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <div className="flex items-center gap-2">
                <CalendarDays size={16} className="text-gn-text" />
                <span className="text-[14px] font-semibold text-gn-text">
                  Planner
                </span>
              </div>
              <button
                onClick={() => setShowPlanModal(true)}
                className="flex items-center gap-1 rounded-lg border border-[#efeff0] px-2.5 py-1 text-[12px] font-medium text-gn-text hover:bg-gray-50"
              >
                <Plus size={12} />
Plan
              </button>
            </div>

            <div className="px-4 pb-4">
              {/* View Switcher + Nav */}
              <div className="mb-3 flex items-center justify-between">
                <div className="relative">
                  <button
                    onClick={() => setPlannerDropdownOpen(!plannerDropdownOpen)}
                    className="flex items-center gap-1 rounded-lg border border-[#efeff0] px-2.5 py-1 text-[12px] font-medium text-gn-primary hover:bg-gray-50"
                  >
                    {plannerView.charAt(0).toUpperCase() +
                      plannerView.slice(1)}
                    <ChevronDown size={14} className="text-gn-red" />
                  </button>
                  {plannerDropdownOpen && (
                    <div className="absolute left-0 top-full z-20 mt-1 w-[100px] rounded-lg border border-[#efeff0] bg-white py-1 shadow-lg">
                      {["daily", "weekly", "monthly"].map((view) => (
                        <button
                          key={view}
                          onClick={() => {
                            setPlannerView(view);
                            setPlannerDropdownOpen(false);
                          }}
                          className={`w-full px-3 py-1.5 text-left text-[12px] capitalize hover:bg-gray-50 ${
                            view === plannerView
                              ? "font-medium text-gn-primary"
                              : "text-gn-text"
                          }`}
                        >
                          {view}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {plannerView === "monthly" && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevMonth}
                      className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-gray-100"
                    >
                      <ChevronLeft size={14} className="text-gn-red" />
                    </button>
                    <span className="text-[12px] font-medium text-gn-primary">
                      {MONTHS[calendarMonth]} {calendarYear}
                    </span>
                    <button
                      onClick={nextMonth}
                      className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-gray-100"
                    >
                      <ChevronRight size={14} className="text-gn-red" />
                    </button>
                  </div>
                )}

                {plannerView === "daily" && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setDailyDate((d) => Math.max(1, d - 1))
                      }
                      className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-gray-100"
                    >
                      <ChevronLeft size={14} className="text-gn-red" />
                    </button>
                    <span className="text-[12px] font-medium text-gn-primary">
                      {dailyDate} {MONTHS[calendarMonth]}
                    </span>
                    <button
                      onClick={() =>
                        setDailyDate((d) => Math.min(31, d + 1))
                      }
                      className="flex h-6 w-6 items-center justify-center rounded-md hover:bg-gray-100"
                    >
                      <ChevronRight size={14} className="text-gn-red" />
                    </button>
                  </div>
                )}
              </div>

              {/* Calendar Content */}
              <div className="max-h-[220px] overflow-y-auto">
                {plannerView === "monthly" && (
                  <MonthlyCalendar
                    year={calendarYear}
                    month={calendarMonth}
                    events={MONTHLY_EVENTS}
                  />
                )}
                {plannerView === "weekly" && (
                  <WeeklyPlanner tasks={WEEKLY_TASKS} />
                )}
                {plannerView === "daily" && (
                  <DailyPlanner date={dailyDate} tasks={dailyTasks} />
                )}
              </div>
            </div>
          </div>

          {/* Upcoming Dates */}
          <div className="rounded-xl border border-[#efeff0] bg-white">
            <div className="flex items-center gap-2 px-4 pt-4 pb-2">
              <Clock size={16} className="text-gn-text" />
              <span className="text-[14px] font-semibold text-gn-text">
                Upcoming Dates
              </span>
            </div>
            <div className="max-h-[270px] overflow-y-auto px-4 pb-4">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-[#f5f5f5] text-left text-gn-gray">
                    <th className="pb-2 font-medium">Company</th>
                    <th className="pb-2 font-medium">Type</th>
                    <th className="pb-2 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {UPCOMING_DATES.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#f5f5f5] last:border-0"
                    >
                      <td className="py-2 text-gn-text">{item.company}</td>
                      <td className="py-2 text-gn-text">{item.type}</td>
                      <td className="py-2 text-gn-text">{item.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Projects */}
          <div className="flex flex-col rounded-xl border border-[#efeff0] bg-white">
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <div className="flex items-center gap-2">
                <FolderOpen size={16} className="text-gn-text" />
                <span className="text-[14px] font-semibold text-gn-text">
                  Projects
                </span>
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-1 rounded-lg border border-[#efeff0] px-2.5 py-1 text-[12px] font-medium text-gn-text hover:bg-gray-50"
              >
                <Plus size={12} />
                Project
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-2">
              {projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    <X size={24} className="text-gn-gray" />
                  </div>
                  <span className="text-[13px] text-gn-gray">
                    Nothing to find here
                  </span>
                </div>
              ) : (
                <>
                  <div className="mb-2 text-[11px] font-medium text-gn-gray">
                    Daily
                  </div>
                  <div className="flex max-h-[190px] flex-col gap-0.5 overflow-y-auto">
                    {projects.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => toggleProject(p.id)}
                        className="flex items-center gap-2.5 rounded-lg px-1 py-2 text-left hover:bg-gray-50"
                      >
                        <div
                          className={`flex h-[14px] w-[14px] shrink-0 items-center justify-center rounded border ${
                            p.checked
                              ? "border-gn-primary bg-gn-primary"
                              : "border-gn-gray/40"
                          }`}
                        >
                          {p.checked && (
                            <Check size={10} className="text-white" />
                          )}
                        </div>
                        <span className="text-[13px] text-gn-text">
                          {p.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="px-4 pb-4">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gn-primary py-2 text-[13px] font-medium text-white hover:bg-gn-primary-dark"
              >
                <Plus size={14} />
                Create New Project
              </button>
            </div>
          </div>
        </div>

        {/* Coverage Section */}
        <div className="mb-4 rounded-xl border border-[#efeff0] bg-white">
          <div className="flex items-center justify-between px-4 pt-4 pb-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <BarChart3 size={16} className="text-gn-text" />
                <span className="text-[14px] font-semibold text-gn-text">
                  Coverage
                </span>
              </div>
              <div className="relative">
                <button
                  onClick={() => setPortfolioDropdownOpen(!portfolioDropdownOpen)}
                  className="flex items-center gap-1 rounded-full border border-[#efeff0] px-3 py-1 text-[11px] text-gn-text hover:bg-gray-50"
                >
                  Portfolio: {portfolioFilter}
                  <ChevronDown size={14} className="text-gn-red" />
                </button>
                {portfolioDropdownOpen && (
                  <div className="absolute left-0 top-full z-20 mt-1 w-[160px] rounded-lg border border-[#efeff0] bg-white py-1 shadow-lg">
                    {["All", "Global Equity Income", "US Growth", "Asia Pacific"].map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setPortfolioFilter(option);
                          setPortfolioDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-[12px] hover:bg-gray-50 ${
                          option === portfolioFilter
                            ? "font-medium text-gn-primary"
                            : "text-gn-text"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
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

          <div className="overflow-x-auto px-4 pb-4">
            <table className="w-full min-w-[1100px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-[#efeff0] text-[12px] text-gn-gray">
                  <th className="w-8 px-3 pb-3 pt-3" />
                  <SortableHeader
                    label={<>Global Equity Income</>}
                    sortKey="name"
                    activeSortKey={sortKey}
                    sortDir={sortDir}
                    onSort={requestSort}
                    className="px-3 pb-3 pt-3"
                  />
                  <SortableHeader
                    label="Sector"
                    sortKey="sector"
                    activeSortKey={sortKey}
                    sortDir={sortDir}
                    onSort={requestSort}
                    className="px-3 pb-3 pt-3"
                  />
                  <SortableHeader
                    label="Purchase"
                    sortKey="purchase"
                    activeSortKey={sortKey}
                    sortDir={sortDir}
                    onSort={requestSort}
                    className="px-3 pb-3 pt-3"
                  />
                  <th className="px-3 pb-3 pt-3 font-medium">Analyst</th>
                  <th className="px-3 pb-3 pt-3 font-medium">Model</th>
                  <SortableHeader
                    label="Initial Review"
                    sortKey="initialReview"
                    activeSortKey={sortKey}
                    sortDir={sortDir}
                    onSort={requestSort}
                    className="px-3 pb-3 pt-3"
                  />
                  <SortableHeader
                    label="Invest. Thesis"
                    sortKey="investThesis"
                    activeSortKey={sortKey}
                    sortDir={sortDir}
                    onSort={requestSort}
                    className="px-3 pb-3 pt-3"
                  />
                  <SortableHeader
                    label="ESG Review"
                    sortKey="esgReview"
                    activeSortKey={sortKey}
                    sortDir={sortDir}
                    onSort={requestSort}
                    className="px-3 pb-3 pt-3"
                  />
                  <SortableHeader
                    label="Checklist"
                    sortKey="checklist"
                    activeSortKey={sortKey}
                    sortDir={sortDir}
                    onSort={requestSort}
                    className="px-3 pb-3 pt-3"
                  />
                  <SortableHeader
                    label="Company Meeting"
                    sortKey="companyMeeting"
                    activeSortKey={sortKey}
                    sortDir={sortDir}
                    onSort={requestSort}
                    className="px-3 pb-3 pt-3"
                  />
                  <SortableHeader
                    label="Spoken to MGT"
                    sortKey="spokenToMgt"
                    activeSortKey={sortKey}
                    sortDir={sortDir}
                    onSort={requestSort}
                    className="px-3 pb-3 pt-3"
                  />
                  <SortableHeader
                    label="Team Discussion"
                    sortKey="teamDiscussion"
                    activeSortKey={sortKey}
                    sortDir={sortDir}
                    onSort={requestSort}
                    className="px-3 pb-3 pt-3"
                  />
                  <SortableHeader
                    label="Quarterly Earning"
                    sortKey="quarterlyEarning"
                    activeSortKey={sortKey}
                    sortDir={sortDir}
                    onSort={requestSort}
                    className="px-3 pb-3 pt-3"
                  />
                </tr>
              </thead>
              <tbody>
                {sortedCoverage.map((row, rowIdx) => {
                  const dateFields = ["initialReview", "investThesis", "esgReview", "checklist", "companyMeeting", "spokenToMgt", "teamDiscussion", "quarterlyEarning"];
                  return (
                    <tr
                      key={row.id}
                      className="border-b border-[#efeff0] transition-colors hover:bg-gray-50"
                    >
                      <td className="px-3">
                        <Star
                          size={20}
                          className={
                            row.star
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300 hover:text-amber-300"
                          }
                        />
                      </td>
                      <td className="px-3">
                        <div className="flex items-center gap-2">
                          <Image src={row.logo} alt={row.name} width={26} height={26} className="rounded-full" />
                          <div>
                            <div className="font-medium text-gn-text">
                              {row.name}
                            </div>
                            <div className="text-[10px] text-gn-gray">
                              {row.ticker}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 text-gn-gray">{row.sector}</td>
                      <td className="px-3 text-gn-gray">{row.purchase}</td>
                      <td className="px-3">
                        <Image src={row.avatar} alt="Analyst" width={26} height={26} className="rounded-full" />
                      </td>
                      <td className="px-3">
                        {row.model && (
                          <button className="text-gn-gray hover:text-gn-primary"><ExternalLink size={16} /></button>
                        )}
                      </td>
                      {dateFields.map((field, colIdx) => (
                        <td key={field} className="px-3">
                          <span className={`inline-block rounded-md px-3 py-1 text-[12px] font-medium ${DATE_STYLES[(rowIdx * 7 + colIdx * 3) % DATE_STYLES.length]}`}>
                            {row[field]}
                          </span>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateProject}
        />
      )}

      {showPlanModal && (
        <AddPlanModal
          onClose={() => setShowPlanModal(false)}
          onSubmit={handleAddPlan}
        />
      )}
    </div>
  );
}
