"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  X,
  ChevronDown,
  CalendarDays,
  Upload,
  Plus,
  Mail,
  Minus,
  Triangle,
  Link as LinkIcon,
  Bold,
  Italic,
  Type,
  Grid3X3,
  ImageIcon,
  Copy,
} from "lucide-react";

const FUND_TAGS = ["Global Equity Income", "Global Innovators"];

const INITIAL_HOLDINGS = [
  { id: 1, name: "PYPL", logo: "/images/logos/pypl.png" },
  { id: 2, name: "Alibaba Group Ltd.", logo: "/images/logos/alibaba.png" },
  { id: 3, name: "Netease Inc", logo: "/images/logos/netease.png" },
  { id: 4, name: "Payoneer Inc", logo: "/images/logos/payoneer.png" },
];

const DOC_TYPES = ["Earnings", "Research Note", "ESG Review", "Initial Review", "Investment Thesis"];
const AUTHORS = [
  { name: "Anna Nikol Smith", avatar: "/images/table-avatar3.png" },
  { name: "Tom Sherwood", avatar: "/images/table-avatar1.png" },
  { name: "Emily Chen", avatar: "/images/table-avatar3.png" },
  { name: "James Park", avatar: "/images/table-avatar1.png" },
  { name: "Sarah Kim", avatar: "/images/table-avatar3.png" },
];
const TEAMS = ["Top Trader Team", "Global Team", "US Team", "EU Team", "Asia Team"];
const DOC_CATEGORIES = ["Quarterly", "Annual", "Ad-hoc", "Monthly"];
const SENTIMENT_OPTIONS = ["Positive", "Neutral", "Negative"];
const GGI_SENTIMENTS = ["Positive", "Neutral", "Negative", "Strong Buy", "Hold"];

const SUMMARY_TABS = ["Results", "Guidance", "Thesis Change", "Market Reaction", "Guinness Reaction"];
const COMMENT_OPTIONS = ["No Comment", "Positive", "Negative", "Neutral"];

const ALL_STOCKS = [
  { id: 101, name: "DELL", logo: "/images/logos/dell.png" },
  { id: 102, name: "Intel", logo: "/images/logos/intel.png" },
  { id: 103, name: "NVIDIA", logo: "/images/logos/nvida.png" },
  { id: 104, name: "Coca Cola", logo: "/images/logos/cocacola.png" },
  { id: 105, name: "Pepsi", logo: "/images/logos/pepsi.png" },
  { id: 106, name: "Meta", logo: "/images/logos/meta.png" },
  { id: 107, name: "Unilever", logo: "/images/logos/unilever.png" },
];

function SentimentIndicator({ value }) {
  if (value === "Positive" || value === "Strong Buy") {
    return <Triangle size={8} className="fill-green-600 text-green-600" />;
  }
  if (value === "Negative") {
    return <Triangle size={8} className="rotate-180 fill-red-500 text-red-500" />;
  }
  return null;
}

function RadioIndicator({ option }) {
  if (option === "Positive") return <Triangle size={7} className="fill-red-500 text-red-500" />;
  if (option === "Negative") return <Triangle size={7} className="rotate-180 fill-red-500 text-red-500" />;
  return null;
}

function EditorToolbar() {
  return (
    <div className="flex items-center gap-2 border-b border-[#efeff0] px-3 py-2 text-gn-gray">
      <button className="hover:text-gn-text"><Plus size={14} /></button>
      <button className="hover:text-gn-text"><Type size={14} /></button>
      <button className="hover:text-gn-text"><Bold size={14} /></button>
      <button className="hover:text-gn-text"><Italic size={14} /></button>
      <button className="hover:text-gn-text"><LinkIcon size={14} /></button>
      <button className="hover:text-gn-text"><Grid3X3 size={14} /></button>
      <button className="hover:text-gn-text"><ImageIcon size={14} /></button>
      <button className="hover:text-gn-text"><Copy size={14} /></button>
    </div>
  );
}

function EditorArea({ value, onChange, placeholder, rows = 5 }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#efeff0]">
      <EditorToolbar />
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none px-3 py-3 text-[12px] text-gn-text outline-none placeholder:text-gn-gray"
      />
    </div>
  );
}

export default function UploadDocumentModal({ onClose }) {
  const [holdings, setHoldings] = useState(INITIAL_HOLDINGS);
  const [docType, setDocType] = useState("");
  const [docDate, setDocDate] = useState("");
  const [author, setAuthor] = useState(null);
  const [team, setTeam] = useState("");
  const [docCategory, setDocCategory] = useState("");
  const [ggiSentiment, setGgiSentiment] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [printDate, setPrintDate] = useState("");
  const [sharePointLink, setSharePointLink] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [summaryVisible, setSummaryVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("Results");
  const [tabSentiment, setTabSentiment] = useState(
    Object.fromEntries(SUMMARY_TABS.map((t) => [t, "No Comment"]))
  );
  const [summaryContent, setSummaryContent] = useState(
    Object.fromEntries(SUMMARY_TABS.map((t) => [t, ""]))
  );
  const [sections, setSections] = useState({
    headline: { open: false, content: "" },
    summaryText: { open: false, content: "" },
    posNeg: { open: false },
    guidance: { open: false, content: "" },
    additional: { open: false, content: "" },
  });
  const [positives, setPositives] = useState("");
  const [negatives, setNegatives] = useState("");
  const [sendEmail, setSendEmail] = useState(false);
  const [holdingDropdownOpen, setHoldingDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const dateRef = useRef(null);
  const printDateRef = useRef(null);
  const fileInputRef = useRef(null);
  const scrollRef = useRef(null);

  function removeHolding(id) {
    setHoldings((prev) => prev.filter((h) => h.id !== id));
  }

  function addHolding(stock) {
    if (!holdings.find((h) => h.id === stock.id)) {
      setHoldings((prev) => [...prev, { id: stock.id, name: stock.name, logo: stock.logo }]);
    }
    setHoldingDropdownOpen(false);
  }

  function handleFileDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer?.files?.[0] || e.target?.files?.[0];
    if (file) {
      setUploadedFile(file);
      setErrors((prev) => ({ ...prev, file: undefined }));
    }
  }

  function handleDragOver(e) {
    e.preventDefault();
    setDragging(true);
  }

  function toggleSection(key) {
    setSections((prev) => ({
      ...prev,
      [key]: { ...prev[key], open: !prev[key].open },
    }));
  }

  function updateSectionContent(key, value) {
    setSections((prev) => ({
      ...prev,
      [key]: { ...prev[key], content: value },
    }));
  }

  function validate() {
    const newErrors = {};
    if (!docType) newErrors.docType = true;
    if (!docDate) newErrors.docDate = true;
    if (!author) newErrors.author = true;
    if (!team) newErrors.team = true;
    if (!docCategory) newErrors.docCategory = true;
    if (!ggiSentiment) newErrors.ggiSentiment = true;
    if (!sentiment) newErrors.sentiment = true;
    if (!uploadedFile) newErrors.file = true;
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0 && scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    return Object.keys(newErrors).length === 0;
  }

  function handleSave() {
    if (validate()) {
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="flex max-h-[90vh] w-[720px] flex-col rounded-xl bg-white shadow-[0px_0px_12px_rgba(0,0,0,0.1),0px_4px_15px_rgba(0,0,0,0.15)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div ref={scrollRef} className="main-scroll flex-1 overflow-y-auto p-6">
          {/* Company Header */}
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image src="/images/logos/dell.png" alt="Dell" width={44} height={44} className="rounded-full" />
              <div>
                <h3 className="text-[17px] font-bold text-gn-text">Dell Technologies Inc.</h3>
                <div className="mt-0.5 flex items-center gap-2">
                  {FUND_TAGS.map((tag) => (
                    <span key={tag} className="text-[12px] font-medium text-gn-primary">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-gn-gray hover:text-gn-text">
              <X size={20} />
            </button>
          </div>

          {/* Holdings / Relevant Stocks */}
          <div className="mb-5">
            <div className="flex flex-wrap items-center gap-2">
              {holdings.map((h) => (
                <div
                  key={h.id}
                  className="flex items-center gap-1.5 rounded-full border border-[#efeff0] bg-white px-2.5 py-1 text-[12px] font-medium text-gn-text"
                >
                  <Image src={h.logo} alt={h.name} width={18} height={18} className="rounded-full" />
                  {h.name}
                  <button onClick={() => removeHolding(h.id)} className="ml-0.5 text-gn-gray hover:text-gn-red">
                    <X size={12} />
                  </button>
                </div>
              ))}
              <div className="relative">
                <button
                  onClick={() => setHoldingDropdownOpen(!holdingDropdownOpen)}
                  className="flex items-center gap-1 rounded-full border border-dashed border-gn-gray px-2.5 py-1 text-[12px] font-medium text-gn-text hover:bg-gray-50"
                >
                  <Plus size={12} />
                  Holding
                </button>
                {holdingDropdownOpen && (
                  <div className="absolute left-0 top-full z-30 mt-1 w-[200px] rounded-lg border border-[#efeff0] bg-white py-1 shadow-lg">
                    {ALL_STOCKS.filter((s) => !holdings.find((h) => h.id === s.id)).map((stock) => (
                      <button
                        key={stock.id}
                        onClick={() => addHolding(stock)}
                        className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-[12px] text-gn-text hover:bg-gray-50"
                      >
                        <Image src={stock.logo} alt={stock.name} width={18} height={18} className="rounded-full" />
                        {stock.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Row 1: Document Type / Date / Author */}
          <div className="mb-4 grid grid-cols-3 gap-3">
            <SelectField
              label="Document Type"
              value={docType}
              onChange={(v) => { setDocType(v); setErrors((p) => ({ ...p, docType: undefined })); }}
              options={DOC_TYPES}
              placeholder="Select type"
              error={errors.docType}
            />
            <DateField
              label="Date"
              value={docDate}
              onChange={(v) => { setDocDate(v); setErrors((p) => ({ ...p, docDate: undefined })); }}
              inputRef={dateRef}
              placeholder="Select date"
              error={errors.docDate}
            />
            <AuthorField
              label="Author"
              value={author}
              onChange={(v) => { setAuthor(v); setErrors((p) => ({ ...p, author: undefined })); }}
              options={AUTHORS}
              placeholder="Select author"
              error={errors.author}
            />
          </div>

          {/* Form Row 2: Team / Document Category / Guinness Sentiment */}
          <div className="mb-4 grid grid-cols-3 gap-3">
            <SelectField
              label="Team"
              value={team}
              onChange={(v) => { setTeam(v); setErrors((p) => ({ ...p, team: undefined })); }}
              options={TEAMS}
              placeholder="Select team"
              error={errors.team}
            />
            <SelectField
              label="Document Category"
              value={docCategory}
              onChange={(v) => { setDocCategory(v); setErrors((p) => ({ ...p, docCategory: undefined })); }}
              options={DOC_CATEGORIES}
              placeholder="Choose a category"
              error={errors.docCategory}
            />
            <SentimentField
              label="Guinness Sentiment"
              value={ggiSentiment}
              onChange={(v) => { setGgiSentiment(v); setErrors((p) => ({ ...p, ggiSentiment: undefined })); }}
              options={GGI_SENTIMENTS}
              placeholder="Select sentiment"
              error={errors.ggiSentiment}
            />
          </div>

          {/* Form Row 3: Sentiment / Print Date / SharePoint Link */}
          <div className="mb-5 grid grid-cols-3 gap-3">
            <SentimentField
              label="Sentiment"
              value={sentiment}
              onChange={(v) => { setSentiment(v); setErrors((p) => ({ ...p, sentiment: undefined })); }}
              options={SENTIMENT_OPTIONS}
              placeholder="Select sentiment"
              error={errors.sentiment}
            />
            <DateField
              label="Print Date"
              value={printDate}
              onChange={setPrintDate}
              inputRef={printDateRef}
              placeholder="Autofill"
            />
            <div>
              <label className="mb-1 block text-[11px] font-medium text-gn-gray">SharePoint Link</label>
              <div className="flex h-[36px] items-center gap-2 rounded-lg border border-[#efeff0] bg-gn-input px-3">
                <LinkIcon size={14} className="shrink-0 text-gn-gray" />
                <input
                  type="text"
                  value={sharePointLink}
                  onChange={(e) => setSharePointLink(e.target.value)}
                  placeholder="Put a link here"
                  className="flex-1 bg-transparent text-[12px] text-gn-text outline-none placeholder:text-gn-gray"
                />
              </div>
            </div>
          </div>

          {/* File Upload Dropzone */}
          <div className="mb-5">
            <div
              onDrop={handleFileDrop}
              onDragOver={handleDragOver}
              onDragLeave={() => setDragging(false)}
              onClick={() => fileInputRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed py-8 transition-colors ${
                errors.file
                  ? "border-red-400 bg-red-50/30"
                  : dragging
                    ? "border-gn-primary bg-blue-50/40"
                    : "border-[#D5DAE1] bg-[#FAFBFD] hover:border-gn-primary"
              }`}
            >
              {uploadedFile ? (
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-medium text-gn-text">{uploadedFile.name}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); setUploadedFile(null); }}
                    className="text-gn-gray hover:text-gn-red"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={22} className="mb-2 text-gn-gray" />
                  <p className="text-[13px] text-gn-gray">
                    Please click to choose or drag files to this area
                  </p>
                </>
              )}
            </div>
            {errors.file && <p className="mt-1 text-[11px] text-red-500">Please upload a file</p>}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              onChange={handleFileDrop}
              className="hidden"
            />
          </div>

          {/* Summary Section with Tabs */}
          <div className="mb-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[14px] font-semibold text-gn-text">Summary</span>
              <button
                onClick={() => setSummaryVisible(!summaryVisible)}
                className="flex items-center gap-1 rounded-lg border border-[#efeff0] px-3 py-1 text-[12px] font-medium text-gn-text hover:bg-gray-50"
              >
                {summaryVisible ? <Minus size={12} /> : <Plus size={12} />}
                {summaryVisible ? "Hide Block" : "Show Block"}
              </button>
            </div>

            {summaryVisible && (
              <>
                <div className="mb-3 flex items-center border-b border-[#efeff0]">
                  {SUMMARY_TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-[12px] font-medium transition-colors ${
                        activeTab === tab
                          ? "border-b-2 border-gn-primary text-gn-primary"
                          : "text-gn-gray hover:text-gn-text"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Radio Options */}
                <div className="mb-3 flex items-center gap-5">
                  {COMMENT_OPTIONS.map((opt) => (
                    <label key={opt} className="flex cursor-pointer items-center gap-1.5 text-[12px] text-gn-text">
                      <input
                        type="radio"
                        name={`summary-sentiment-${activeTab}`}
                        checked={tabSentiment[activeTab] === opt}
                        onChange={() => setTabSentiment((prev) => ({ ...prev, [activeTab]: opt }))}
                        className="accent-gn-red"
                      />
                      {opt}
                      <RadioIndicator option={opt} />
                    </label>
                  ))}
                </div>

                <EditorArea
                  value={summaryContent[activeTab]}
                  onChange={(v) => setSummaryContent((prev) => ({ ...prev, [activeTab]: v }))}
                  placeholder="Write any comments here..."
                />
              </>
            )}
          </div>

          {/* Headline Section */}
          <CollapsibleBlock
            label="Headline"
            open={sections.headline.open}
            onToggle={() => toggleSection("headline")}
          >
            <textarea
              value={sections.headline.content}
              onChange={(e) => updateSectionContent("headline", e.target.value)}
              placeholder="Write headline here..."
              rows={3}
              className="w-full resize-none rounded-lg border border-[#efeff0] px-3 py-3 text-[12px] text-gn-text outline-none placeholder:text-gn-gray focus:border-gn-primary"
            />
          </CollapsibleBlock>

          {/* Summary Text Section */}
          <CollapsibleBlock
            label="Summary"
            open={sections.summaryText.open}
            onToggle={() => toggleSection("summaryText")}
          >
            <EditorArea
              value={sections.summaryText.content}
              onChange={(v) => updateSectionContent("summaryText", v)}
              placeholder="Write summary here..."
            />
          </CollapsibleBlock>

          {/* Positives and Negatives */}
          <CollapsibleBlock
            label="Positives and Negatives"
            open={sections.posNeg.open}
            onToggle={() => toggleSection("posNeg")}
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="overflow-hidden rounded-lg border border-[#efeff0]">
                <EditorToolbar />
                <div className="flex gap-2 px-3 pt-2">
                  <Triangle size={8} className="mt-1 shrink-0 fill-amber-500 text-amber-500" />
                  <textarea
                    value={positives}
                    onChange={(e) => setPositives(e.target.value)}
                    placeholder="Write positive points here..."
                    rows={6}
                    className="w-full resize-none text-[12px] text-gn-text outline-none placeholder:text-gn-gray"
                  />
                </div>
              </div>
              <div className="overflow-hidden rounded-lg border border-[#efeff0]">
                <EditorToolbar />
                <div className="flex gap-2 px-3 pt-2">
                  <Triangle size={8} className="mt-1 shrink-0 rotate-180 fill-red-500 text-red-500" />
                  <textarea
                    value={negatives}
                    onChange={(e) => setNegatives(e.target.value)}
                    placeholder="Write negative points here..."
                    rows={6}
                    className="w-full resize-none text-[12px] text-gn-text outline-none placeholder:text-gn-gray"
                  />
                </div>
              </div>
            </div>
          </CollapsibleBlock>

          {/* Guidance & Outlook */}
          <CollapsibleBlock
            label="Guidance & Outlook"
            open={sections.guidance.open}
            onToggle={() => toggleSection("guidance")}
          >
            <EditorArea
              value={sections.guidance.content}
              onChange={(v) => updateSectionContent("guidance", v)}
              placeholder="Write guidance and outlook here..."
            />
          </CollapsibleBlock>

          {/* Additional (optional) */}
          <CollapsibleBlock
            label="Additional (optional)"
            open={sections.additional.open}
            onToggle={() => toggleSection("additional")}
          >
            <EditorArea
              value={sections.additional.content}
              onChange={(v) => updateSectionContent("additional", v)}
              placeholder="Write any additional notes here..."
              rows={6}
            />
          </CollapsibleBlock>
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-[#efeff0] px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSendEmail(!sendEmail)}
              className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-[13px] font-medium transition-colors ${
                sendEmail
                  ? "border-gn-primary bg-gn-primary text-white"
                  : "border-[#efeff0] text-gn-text hover:bg-gray-50"
              }`}
            >
              <Mail size={14} />
              Send Email to Investors
            </button>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="rounded-lg border border-[#efeff0] px-5 py-2 text-[13px] font-medium text-gn-text hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-lg bg-gn-primary px-5 py-2 text-[13px] font-medium text-white hover:bg-gn-primary-dark"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CollapsibleBlock({ label, open, onToggle, children }) {
  return (
    <div className="mb-4">
      <div className="mb-3 flex items-center justify-between border-b border-[#efeff0] pb-3">
        <span className="text-[14px] font-semibold text-gn-text">{label}</span>
        <button
          onClick={onToggle}
          className="flex items-center gap-1 rounded-lg border border-[#efeff0] px-3 py-1 text-[12px] font-medium text-gn-text hover:bg-gray-50"
        >
          {open ? <Minus size={12} /> : <Plus size={12} />}
          {open ? "Hide Block" : "Show Block"}
        </button>
      </div>
      {open && children}
    </div>
  );
}

function SelectField({ label, value, onChange, options, placeholder, error }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <label className="mb-1 block text-[11px] font-medium text-gn-gray">{label}</label>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={`flex h-[36px] w-full items-center justify-between rounded-lg border bg-gn-input px-3 text-[12px] hover:bg-gray-50 ${
            error ? "border-red-400" : "border-[#efeff0]"
          }`}
        >
          <span className={value ? "text-gn-text" : "text-gn-gray"}>{value || placeholder}</span>
          <ChevronDown size={14} className="text-gn-red" />
        </button>
        {error && <p className="mt-0.5 text-[10px] text-red-500">Required</p>}
        {open && (
          <div className="absolute left-0 top-full z-30 mt-1 w-full rounded-lg border border-[#efeff0] bg-white py-1 shadow-lg">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full px-3 py-1.5 text-left text-[12px] hover:bg-gray-50 ${
                  opt === value ? "font-medium text-gn-primary" : "text-gn-text"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AuthorField({ label, value, onChange, options, placeholder, error }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <label className="mb-1 block text-[11px] font-medium text-gn-gray">{label}</label>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={`flex h-[36px] w-full items-center justify-between rounded-lg border bg-gn-input px-3 text-[12px] hover:bg-gray-50 ${
            error ? "border-red-400" : "border-[#efeff0]"
          }`}
        >
          {value ? (
            <div className="flex items-center gap-2">
              <Image src={value.avatar} alt={value.name} width={20} height={20} className="rounded-full" />
              <span className="text-gn-text">{value.name}</span>
            </div>
          ) : (
            <span className="text-gn-gray">{placeholder}</span>
          )}
          <ChevronDown size={14} className="text-gn-red" />
        </button>
        {error && <p className="mt-0.5 text-[10px] text-red-500">Required</p>}
        {open && (
          <div className="absolute left-0 top-full z-30 mt-1 w-full rounded-lg border border-[#efeff0] bg-white py-1 shadow-lg">
            {options.map((opt) => (
              <button
                key={opt.name}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-[12px] hover:bg-gray-50 ${
                  value?.name === opt.name ? "font-medium text-gn-primary" : "text-gn-text"
                }`}
              >
                <Image src={opt.avatar} alt={opt.name} width={20} height={20} className="rounded-full" />
                {opt.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SentimentField({ label, value, onChange, options, placeholder, error }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <label className="mb-1 block text-[11px] font-medium text-gn-gray">{label}</label>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className={`flex h-[36px] w-full items-center justify-between rounded-lg border bg-gn-input px-3 text-[12px] hover:bg-gray-50 ${
            error ? "border-red-400" : "border-[#efeff0]"
          }`}
        >
          {value ? (
            <div className="flex items-center gap-1.5">
              <SentimentIndicator value={value} />
              <span className="text-gn-text">{value}</span>
            </div>
          ) : (
            <span className="text-gn-gray">{placeholder}</span>
          )}
          <ChevronDown size={14} className="text-gn-red" />
        </button>
        {error && <p className="mt-0.5 text-[10px] text-red-500">Required</p>}
        {open && (
          <div className="absolute left-0 top-full z-30 mt-1 w-full rounded-lg border border-[#efeff0] bg-white py-1 shadow-lg">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`flex w-full items-center gap-1.5 px-3 py-1.5 text-left text-[12px] hover:bg-gray-50 ${
                  opt === value ? "font-medium text-gn-primary" : "text-gn-text"
                }`}
              >
                <SentimentIndicator value={opt} />
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DateField({ label, value, onChange, inputRef, placeholder, error }) {
  return (
    <div>
      <label className="mb-1 block text-[11px] font-medium text-gn-gray">{label}</label>
      <button
        onClick={() => inputRef.current?.showPicker()}
        className={`flex h-[36px] w-full items-center justify-between rounded-lg border bg-gn-input px-3 text-[12px] hover:bg-gray-50 ${
          error ? "border-red-400" : "border-[#efeff0]"
        }`}
      >
        <div className="flex items-center gap-2">
          <CalendarDays size={14} className="text-gn-gray" />
          <span className={value ? "text-gn-text" : "text-gn-gray"}>
            {value
              ? new Date(value + "T00:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
              : placeholder}
          </span>
        </div>
        <ChevronDown size={14} className="text-gn-red" />
      </button>
      {error && <p className="mt-0.5 text-[10px] text-red-500">Required</p>}
      <input
        ref={inputRef}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="invisible absolute h-0 w-0"
      />
    </div>
  );
}
