interface CountryInfo {
  name: string;
  description: string;
  visited: boolean;
  yearVisited?: number;
  highlights?: string[];
}

export const countryData: Record<string, CountryInfo> = {
  FRA: {
    name: "France",
    description: "Explored the Mediterranean coast and dove in its crystal-clear waters.",
    visited: true,
    yearVisited: 2023,
    highlights: ["SCUBA diving in Mediterranean", "Visiting coastal towns", "Local cuisine"]
  },
  IRL: {
    name: "Ireland",
    description: "Ancestral homeland with rich history and beautiful landscapes.",
    visited: true,
    yearVisited: 2022,
    highlights: ["Family history", "Coastal drives", "Traditional music"]
  },
  // Add more countries as needed
};

export const defaultCountryInfo: CountryInfo = {
  name: "Unknown",
  description: "No information available yet.",
  visited: false
}; 