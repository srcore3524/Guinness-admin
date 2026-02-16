export const MAIN_TABS = ["Dashboard", "Priorities", "Earnings", "Calendars", "NAVs", "Documents", "Fund"];
export const SUB_TABS = ["Portfolio", "Watchlist", "Legacy"];

export const DATE_STYLES = [
  "bg-green-100 text-green-600",
  "bg-amber-50 text-amber-500",
  "bg-red-100 text-gn-red",
];

export const DASHBOARD_DATA = [
  { id: 0, star: true, name: "DELL", ticker: "DLL", logo: "/images/logos/dell.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 1, star: false, name: "Intel", ticker: "INTL", logo: "/images/logos/pg.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 2, star: true, name: "NVIDIA", ticker: "NVIDIA", logo: "/images/logos/mondelez.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 3, star: false, name: "Procter & Gamble", ticker: "PRGMBL", logo: "/images/logos/pg.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 4, star: false, name: "Pepsi Co.", ticker: "PEPCO", logo: "/images/logos/pepsi.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 5, star: false, name: "Norven", ticker: "NRV", logo: "/images/logos/cocacola.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 6, star: false, name: "Unilever", ticker: "UNVR", logo: "/images/logos/unilever.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 7, star: false, name: "Telegram", ticker: "TON", logo: "/images/logos/unilever.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 8, star: false, name: "Meta", ticker: "META", logo: "/images/logos/mondelez.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 9, star: false, name: "DELL", ticker: "CCLA", logo: "/images/logos/cocacola.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 10, star: false, name: "DELL", ticker: "INTL", logo: "/images/logos/pg.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 11, star: false, name: "DELL", ticker: "PEPCO", logo: "/images/logos/pepsi.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 12, star: false, name: "DELL", ticker: "TON", logo: "/images/logos/unilever.png", sector: "Consumer Staples", purchase: "02/24" },
  { id: 13, star: false, name: "Procter & Gamble", ticker: "PRGMBL", logo: "/images/logos/pg.png", sector: "Consumer Staples", purchase: "02/24" },
];

export const INDICATORS = ["up", "down", "flat"];

export const EARNINGS_DATA = [
  { id: 0, star: true, name: "Coca Cola", ticker: "CCLA", logo: "/images/logos/cocacola.png", sector: "Consumer Staples", printDate: "02/24", period: "Q1 24", headline: "Some headline" },
  { id: 1, star: false, name: "Procter & Gamble", ticker: "PRGMBL", logo: "/images/logos/pg.png", sector: "Consumer Staples", printDate: "02/24", period: "Q1 24", headline: "Some headline" },
  { id: 2, star: true, name: "Unilever", ticker: "UNVR", logo: "/images/logos/unilever.png", sector: "Consumer Staples", printDate: "02/24", period: "Q2 24", headline: "Some headline" },
  { id: 3, star: false, name: "Mondelez Intl", ticker: "MDLZ", logo: "/images/logos/mondelez.png", sector: "Consumer Staples", printDate: "02/24", period: "Q3 24", headline: "Some headline" },
  { id: 4, star: false, name: "Pepsi Co.", ticker: "PEPCO", logo: "/images/logos/pepsi.png", sector: "Consumer Staples", printDate: "02/24", period: "Q4 24", headline: "Some headline" },
  { id: 5, star: false, name: "Auchan", ticker: "ACHN", logo: "/images/logos/cocacola.png", sector: "Consumer Staples", printDate: "02/24", period: "Q1 25", headline: "Some headline" },
  { id: 6, star: false, name: "Norven", ticker: "NRV", logo: "/images/logos/pepsi.png", sector: "Consumer Staples", printDate: "02/24", period: "Q1 25", headline: "Some headline" },
  { id: 7, star: false, name: "iHerb", ticker: "IHRB", logo: "/images/logos/pg.png", sector: "Consumer Staples", printDate: "02/24", period: "Q1 25", headline: "Some headline" },
  { id: 8, star: false, name: "Telegram", ticker: "TON", logo: "/images/logos/unilever.png", sector: "Consumer Staples", printDate: "02/24", period: "Q1 24", headline: "Some headline" },
  { id: 9, star: false, name: "Meta", ticker: "META", logo: "/images/logos/mondelez.png", sector: "Consumer Staples", printDate: "02/24", period: "Q2 24", headline: "Some headline" },
  { id: 10, star: false, name: "Coca Cola", ticker: "CCLA", logo: "/images/logos/cocacola.png", sector: "Consumer Staples", printDate: "02/24", period: "Q3 24", headline: "Some headline" },
  { id: 11, star: false, name: "Procter & Gamble", ticker: "PRGMBL", logo: "/images/logos/pg.png", sector: "Consumer Staples", printDate: "02/24", period: "Q4 24", headline: "Some headline" },
];

export const DASHBOARD_DATE_FIELDS = [
  "thesis1", "thesis2", "thesis3", "esg", "checklist",
  "ggiMeeting", "earnings", "earningsQ1", "earningsQ2", "earningsQ3",
];

export const PRIORITIES_DATE_FIELDS = [
  "initialReview", "investThesis", "esg", "checklist",
  "companyMeeting", "spokeToMgt", "teamDiscussion", "quarterlyEarning",
];

export const INDICATOR_FIELDS = ["result", "guidance", "marketReaction", "guinnessReaction"];
