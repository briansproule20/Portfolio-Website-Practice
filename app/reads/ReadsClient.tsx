'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ReadsTable from './ReadsTable';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from "react-simple-maps";
import { countryData, defaultCountryInfo } from '@/utils/countryData';

const geoUrl = "/world-110m.json";

const DEFAULT_POSITION = {
  coordinates: [0, 30] as [number, number],
  zoom: 1.2
};

type Book = {
  title: string;
  author: string;
  pages?: string;
  year?: string;
  rating?: string;
  nationality?: string;
};

type ReadsClientProps = {
  books: Book[];
};

export default function ReadsClient({ books }: ReadsClientProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [position, setPosition] = useState<typeof DEFAULT_POSITION>(DEFAULT_POSITION);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  const [hoveredCountryName, setHoveredCountryName] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  function handleMoveEnd(newPosition: any) {
    setPosition(newPosition);
  }

  function handleMove(position: { x: number; y: number; zoom: number }) {
    setPosition({
      coordinates: [position.x, position.y] as [number, number],
      zoom: position.zoom
    });
  }

  function handleDoubleClick() {
    setPosition(DEFAULT_POSITION);
  }

  function handleMouseMove(e: React.MouseEvent) {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }

  function handleCountryClick(countryCode: string) {
    if (countryBookStats[countryCode]) {
      setSelectedCountry(countryCode);
    }
  }

  function closeModal() {
    setSelectedCountry(null);
  }

  // 1. Add nationality-to-country mapping
  const nationalityToCountry: Record<string, { name: string; iso: string }> = {
    'American': { name: 'United States of America', iso: 'USA' },
    'American ': { name: 'United States of America', iso: 'USA' }, // Trailing space
    'Amerian': { name: 'United States of America', iso: 'USA' }, // Typo
    'British': { name: 'United Kingdom', iso: 'GBR' },
    'Canadian': { name: 'Canada', iso: 'CAN' },
    'French': { name: 'France', iso: 'FRA' },
    'German': { name: 'Germany', iso: 'DEU' },
    'Irish': { name: 'Ireland', iso: 'IRL' },
    'Russian': { name: 'Russia', iso: 'RUS' },
    'Japanese': { name: 'Japan', iso: 'JPN' },
    'Brazilian': { name: 'Brazil', iso: 'BRA' },
    'Colombian': { name: 'Colombia', iso: 'COL' },
    'Afghan': { name: 'Afghanistan', iso: 'AFG' },
    'Afghani': { name: 'Afghanistan', iso: 'AFG' },
    'Native American': { name: 'United States of America', iso: 'USA' },
    'Lebanese': { name: 'Lebanon', iso: 'LBN' },
    'Spanish': { name: 'Spain', iso: 'ESP' },
    'Czech': { name: 'Czechia', iso: 'CZE' },
    'Polish': { name: 'Poland', iso: 'POL' },
    'Ukrainian': { name: 'Ukraine', iso: 'UKR' },
    'Nigerian': { name: 'Nigeria', iso: 'NGA' },
    'Chilean': { name: 'Chile', iso: 'CHL' },
    'Chilean ': { name: 'Chile', iso: 'CHL' }, // Trailing space
    'Slovak': { name: 'Slovakia', iso: 'SVK' },
    'Slovenian': { name: 'Slovenia', iso: 'SVN' },
    'Serbian': { name: 'Serbia', iso: 'SRB' },
    'Kosovan': { name: 'Kosovo', iso: 'XKX' },
    'Italian': { name: 'Italy', iso: 'ITA' },
    'Dutch': { name: 'Netherlands', iso: 'NLD' },
    'Greek': { name: 'Greece', iso: 'GRC' },
    'Turkish': { name: 'Turkey', iso: 'TUR' },
    'Austrian': { name: 'Austria', iso: 'AUT' },
    'Swedish': { name: 'Sweden', iso: 'SWE' },
    'Norwegian': { name: 'Norway', iso: 'NOR' },
    'Danish': { name: 'Denmark', iso: 'DNK' },
    'Finnish': { name: 'Finland', iso: 'FIN' },
    'Swiss': { name: 'Switzerland', iso: 'CHE' },
    'Belgian': { name: 'Belgium', iso: 'BEL' },
    'Portuguese': { name: 'Portugal', iso: 'PRT' },
    'Hungarian': { name: 'Hungary', iso: 'HUN' },
    'Romanian': { name: 'Romania', iso: 'ROU' },
    'Bulgarian': { name: 'Bulgaria', iso: 'BGR' },
    'Croatian': { name: 'Croatia', iso: 'HRV' },
    'Bosnian': { name: 'Bosnia and Herzegovina', iso: 'BIH' },
    'Montenegrin': { name: 'Montenegro', iso: 'MNE' },
    'Macedonian': { name: 'North Macedonia', iso: 'MKD' },
    'Albanian': { name: 'Albania', iso: 'ALB' },
    'Moldovan': { name: 'Moldova', iso: 'MDA' },
    'Estonian': { name: 'Estonia', iso: 'EST' },
    'Latvian': { name: 'Latvia', iso: 'LVA' },
    'Lithuanian': { name: 'Lithuania', iso: 'LTU' },
    'Icelandic': { name: 'Iceland', iso: 'ISL' },
    'Luxembourgish': { name: 'Luxembourg', iso: 'LUX' },
    'Maltese': { name: 'Malta', iso: 'MLT' },
    'Cypriot': { name: 'Cyprus', iso: 'CYP' },
    'Israeli': { name: 'Israel', iso: 'ISR' },
    'Palestinian': { name: 'Palestine', iso: 'PSE' },
    'Jordanian': { name: 'Jordan', iso: 'JOR' },
    'Syrian': { name: 'Syria', iso: 'SYR' },
    'Iraqi': { name: 'Iraq', iso: 'IRQ' },
    'Iranian': { name: 'Iran', iso: 'IRN' },
    'Kuwaiti': { name: 'Kuwait', iso: 'KWT' },
    'Saudi': { name: 'Saudi Arabia', iso: 'SAU' },
    'Yemeni': { name: 'Yemen', iso: 'YEM' },
    'Omani': { name: 'Oman', iso: 'OMN' },
    'Emirati': { name: 'United Arab Emirates', iso: 'ARE' },
    'Qatari': { name: 'Qatar', iso: 'QAT' },
    'Bahraini': { name: 'Bahrain', iso: 'BHR' },
    'Egyptian': { name: 'Egypt', iso: 'EGY' },
    'Libyan': { name: 'Libya', iso: 'LBY' },
    'Tunisian': { name: 'Tunisia', iso: 'TUN' },
    'Algerian': { name: 'Algeria', iso: 'DZA' },
    'Moroccan': { name: 'Morocco', iso: 'MAR' },
    'Mauritanian': { name: 'Mauritania', iso: 'MRT' },
    'Senegalese': { name: 'Senegal', iso: 'SEN' },
    'Gambian': { name: 'Gambia', iso: 'GMB' },
    'Guinea-Bissauan': { name: 'Guinea-Bissau', iso: 'GNB' },
    'Guinean': { name: 'Guinea', iso: 'GIN' },
    'Sierra Leonean': { name: 'Sierra Leone', iso: 'SLE' },
    'Liberian': { name: 'Liberia', iso: 'LBR' },
    'Ivorian': { name: 'Ivory Coast', iso: 'CIV' },
    'Ghanaian': { name: 'Ghana', iso: 'GHA' },
    'Togolese': { name: 'Togo', iso: 'TGO' },
    'Beninese': { name: 'Benin', iso: 'BEN' },
    'Burkinese': { name: 'Burkina Faso', iso: 'BFA' },
    'Malian': { name: 'Mali', iso: 'MLI' },
    'Nigerien': { name: 'Niger', iso: 'NER' },
    'Chadian': { name: 'Chad', iso: 'TCD' },
    'Cameroonian': { name: 'Cameroon', iso: 'CMR' },
    'Central African': { name: 'Central African Republic', iso: 'CAF' },
    'Equatorial Guinean': { name: 'Equatorial Guinea', iso: 'GNQ' },
    'Gabonese': { name: 'Gabon', iso: 'GAB' },
    'Congolese': { name: 'Republic of the Congo', iso: 'COG' },
    'DR Congolese': { name: 'Democratic Republic of the Congo', iso: 'COD' },
    'Angolan': { name: 'Angola', iso: 'AGO' },
    'Zambian': { name: 'Zambia', iso: 'ZMB' },
    'Zimbabwean': { name: 'Zimbabwe', iso: 'ZWE' },
    'Botswanan': { name: 'Botswana', iso: 'BWA' },
    'Namibian': { name: 'Namibia', iso: 'NAM' },
    'South African': { name: 'South Africa', iso: 'ZAF' },
    'Lesothan': { name: 'Lesotho', iso: 'LSO' },
    'Eswatini': { name: 'Eswatini', iso: 'SWZ' },
    'Mozambican': { name: 'Mozambique', iso: 'MOZ' },
    'Malawian': { name: 'Malawi', iso: 'MWI' },
    'Tanzanian': { name: 'Tanzania', iso: 'TZA' },
    'Kenyan': { name: 'Kenya', iso: 'KEN' },
    'Ugandan': { name: 'Uganda', iso: 'UGA' },
    'Rwandan': { name: 'Rwanda', iso: 'RWA' },
    'Burundian': { name: 'Burundi', iso: 'BDI' },
    'Ethiopian': { name: 'Ethiopia', iso: 'ETH' },
    'Eritrean': { name: 'Eritrea', iso: 'ERI' },
    'Djiboutian': { name: 'Djibouti', iso: 'DJI' },
    'Somali': { name: 'Somalia', iso: 'SOM' },
    'Sudanese': { name: 'Sudan', iso: 'SDN' },
    'South Sudanese': { name: 'South Sudan', iso: 'SSD' },
    'Comorian': { name: 'Comoros', iso: 'COM' },
    'Seychellois': { name: 'Seychelles', iso: 'SYC' },
    'Malagasy': { name: 'Madagascar', iso: 'MDG' },
    'Mauritian': { name: 'Mauritius', iso: 'MUS' },
    'Chinese': { name: 'China', iso: 'CHN' },
    'Mongolian': { name: 'Mongolia', iso: 'MNG' },
    'North Korean': { name: 'North Korea', iso: 'PRK' },
    'South Korean': { name: 'South Korea', iso: 'KOR' },
    'Taiwanese': { name: 'Taiwan', iso: 'TWN' },
    'Hong Konger': { name: 'Hong Kong', iso: 'HKG' },
    'Macanese': { name: 'Macau', iso: 'MAC' },
    'Vietnamese': { name: 'Vietnam', iso: 'VNM' },
    'Laotian': { name: 'Laos', iso: 'LAO' },
    'Cambodian': { name: 'Cambodia', iso: 'KHM' },
    'Thai': { name: 'Thailand', iso: 'THA' },
    'Myanmar': { name: 'Myanmar', iso: 'MMR' },
    'Bangladeshi': { name: 'Bangladesh', iso: 'BGD' },
    'Indian': { name: 'India', iso: 'IND' },
    'Pakistani': { name: 'Pakistan', iso: 'PAK' },
    'Sri Lankan': { name: 'Sri Lanka', iso: 'LKA' },
    'Maldivian': { name: 'Maldives', iso: 'MDV' },
    'Nepalese': { name: 'Nepal', iso: 'NPL' },
    'Bhutanese': { name: 'Bhutan', iso: 'BTN' },
    'Kazakh': { name: 'Kazakhstan', iso: 'KAZ' },
    'Kyrgyz': { name: 'Kyrgyzstan', iso: 'KGZ' },
    'Tajik': { name: 'Tajikistan', iso: 'TJK' },
    'Turkmen': { name: 'Turkmenistan', iso: 'TKM' },
    'Uzbek': { name: 'Uzbekistan', iso: 'UZB' },
    'Georgian': { name: 'Georgia', iso: 'GEO' },
    'Armenian': { name: 'Armenia', iso: 'ARM' },
    'Azerbaijani': { name: 'Azerbaijan', iso: 'AZE' },
    'Belarusian': { name: 'Belarus', iso: 'BLR' },
    'Mexican': { name: 'Mexico', iso: 'MEX' },
    'Guatemalan': { name: 'Guatemala', iso: 'GTM' },
    'Belizean': { name: 'Belize', iso: 'BLZ' },
    'Salvadoran': { name: 'El Salvador', iso: 'SLV' },
    'Honduran': { name: 'Honduras', iso: 'HND' },
    'Nicaraguan': { name: 'Nicaragua', iso: 'NIC' },
    'Costa Rican': { name: 'Costa Rica', iso: 'CRI' },
    'Panamanian': { name: 'Panama', iso: 'PAN' },
    'Cuban': { name: 'Cuba', iso: 'CUB' },
    'Jamaican': { name: 'Jamaica', iso: 'JAM' },
    'Haitian': { name: 'Haiti', iso: 'HTI' },
    'Dominican': { name: 'Dominican Republic', iso: 'DOM' },
    'Puerto Rican': { name: 'Puerto Rico', iso: 'PRI' },
    'Trinidadian': { name: 'Trinidad and Tobago', iso: 'TTO' },
    'Barbadian': { name: 'Barbados', iso: 'BRB' },
    'Grenadian': { name: 'Grenada', iso: 'GRD' },
    'Saint Lucian': { name: 'Saint Lucia', iso: 'LCA' },
    'Vincentian': { name: 'Saint Vincent and the Grenadines', iso: 'VCT' },
    'Antiguan': { name: 'Antigua and Barbuda', iso: 'ATG' },
    'Kittitian': { name: 'Saint Kitts and Nevis', iso: 'KNA' },
    'Dominican Islander': { name: 'Dominica', iso: 'DMA' },
    'Bahamian': { name: 'Bahamas', iso: 'BHS' },
    'Caymanian': { name: 'Cayman Islands', iso: 'CYM' },
    'Turks and Caicos Islander': { name: 'Turks and Caicos Islands', iso: 'TCA' },
    'Bermudian': { name: 'Bermuda', iso: 'BMU' },
    'Aruban': { name: 'Aruba', iso: 'ABW' },
    'Curaçaoan': { name: 'Curaçao', iso: 'CUW' },
    'Sint Maartener': { name: 'Sint Maarten', iso: 'SXM' },
    'Surinamese': { name: 'Suriname', iso: 'SUR' },
    'Guyanese': { name: 'Guyana', iso: 'GUY' },
    'Venezuelan': { name: 'Venezuela', iso: 'VEN' },
    'Ecuadorian': { name: 'Ecuador', iso: 'ECU' },
    'Peruvian': { name: 'Peru', iso: 'PER' },
    'Bolivian': { name: 'Bolivia', iso: 'BOL' },
    'Paraguayan': { name: 'Paraguay', iso: 'PRY' },
    'Uruguayan': { name: 'Uruguay', iso: 'URY' },
    'Argentine': { name: 'Argentina', iso: 'ARG' },
    'Falkland Islander': { name: 'Falkland Islands', iso: 'FLK' },
    'Greenlandic': { name: 'Greenland', iso: 'GRL' },
    'Faroe Islander': { name: 'Faroe Islands', iso: 'FRO' },
    'Australian': { name: 'Australia', iso: 'AUS' },
    'New Zealander': { name: 'New Zealand', iso: 'NZL' },
    'Papua New Guinean': { name: 'Papua New Guinea', iso: 'PNG' },
    'Fijian': { name: 'Fiji', iso: 'FJI' },
    'Solomon Islander': { name: 'Solomon Islands', iso: 'SLB' },
    'Vanuatuan': { name: 'Vanuatu', iso: 'VUT' },
    'New Caledonian': { name: 'New Caledonia', iso: 'NCL' },
    'French Polynesian': { name: 'French Polynesia', iso: 'PYF' },
    'Cook Islander': { name: 'Cook Islands', iso: 'COK' },
    'Niuean': { name: 'Niue', iso: 'NIU' },
    'Tokelauan': { name: 'Tokelau', iso: 'TKL' },
    'Samoan': { name: 'Samoa', iso: 'WSM' },
    'Tongan': { name: 'Tonga', iso: 'TON' },
    'Tuvaluan': { name: 'Tuvalu', iso: 'TUV' },
    'Kiribati': { name: 'Kiribati', iso: 'KIR' },
    'Marshallese': { name: 'Marshall Islands', iso: 'MHL' },
    'Micronesian': { name: 'Micronesia', iso: 'FSM' },
    'Palauan': { name: 'Palau', iso: 'PLW' },
    'Nauruan': { name: 'Nauru', iso: 'NRU' },
    'Timorese': { name: 'Timor-Leste', iso: 'TLS' },
    'Indonesian': { name: 'Indonesia', iso: 'IDN' },
    'Malaysian': { name: 'Malaysia', iso: 'MYS' },
    'Singaporean': { name: 'Singapore', iso: 'SGP' },
    'Bruneian': { name: 'Brunei', iso: 'BRN' },
    'Filipino': { name: 'Philippines', iso: 'PHL' },
    'East Timorese': { name: 'Timor-Leste', iso: 'TLS' },
    'Author nationality': { name: 'Unknown', iso: 'XXX' }, // Placeholder for header row
  };

  // 1b. ISO 3-letter code to Numeric country code mapping (for map data)
  const isoToNumeric: Record<string, string> = {
    USA: '840',
    GBR: '826',
    CAN: '124',
    FRA: '250',
    DEU: '276',
    IRL: '372',
    RUS: '643',
    JPN: '392',
    BRA: '076',
    COL: '170',
    AFG: '004',
    LBN: '422',
    ESP: '724',
    CZE: '203',
    POL: '616',
    UKR: '804',
    NGA: '566',
    CHL: '152',
    SVK: '703',
    SVN: '705',
    SRB: '688',
    XKX: 'Kosovo', // Kosovo may not be present in all map data
    ITA: '380',
    NLD: '528',
    GRC: '300',
    TUR: '792',
    // Add more as needed
  };

  // 2. Aggregate books by country numeric code
  const countryBookStats: Record<string, { name: string; count: number; titles: string[] }> = {};
  
  // Debug: Log what we're processing
  console.log('📚 Processing books for nationality mapping:');
  console.log('📚 Total books:', books.length);
  
  books.forEach((book: Book) => {
    const nat = (book.nationality || '').trim();
    console.log(`  "${book.title}" by ${book.author} - Nationality: "${nat}"`);
    
    if (!nat) {
      console.log(`    ❌ No nationality found for "${book.title}"`);
      return;
    }
    
    const country = nationalityToCountry[nat];
    if (!country) {
      console.log(`    ❌ No country mapping found for nationality: "${nat}"`);
      return;
    }
    
    console.log(`    ✅ Mapped "${nat}" to ${country.name} (${country.iso})`);
    
    const numericCode = isoToNumeric[country.iso];
    if (!numericCode) {
      console.log(`    ❌ No numeric code found for country: ${country.name} (${country.iso})`);
      return;
    }

    if (!countryBookStats[numericCode]) {
      countryBookStats[numericCode] = { name: country.name, count: 0, titles: [] };
    }
    countryBookStats[numericCode].count++;
    countryBookStats[numericCode].titles.push(book.title);
  });
  
  console.log('🗺️ Final country book stats:', countryBookStats);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden pt-16"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--highlight)] to-[var(--background)] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-70" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-black mb-4 md:mb-6 text-[var(--foreground)] tracking-tight"
          >
            Reading List
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-[var(--accent)] font-serif italic px-4"
          >
            "I have lived a thousand lives and I've loved a thousand loves. I've walked on distant worlds and seen the end of time. Because I read." ― George R. R. Martin
          </motion.p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-[var(--card)] rounded-xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <p className="text-4xl font-bold text-[var(--highlight)]">{books.length}</p>
            <p className="text-[var(--accent)] mt-2">Books Read</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[var(--highlight)]">
              {books.reduce((acc: number, book: Book) => acc + (book.rating ? parseFloat(book.rating.split('/')[0]) : 0) / books.length, 0).toFixed(1)}
            </p>
            <p className="text-[var(--accent)] mt-2">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-[var(--highlight)]">
              {books.reduce((acc: number, book: Book) => acc + (book.pages ? parseInt(book.pages) : 0), 0).toLocaleString()}
            </p>
            <p className="text-[var(--accent)] mt-2">Pages Read</p>
          </div>
        </div>
      </section>

      {/* Books Table Section */}
      <section className="max-w-6xl mx-auto bg-[var(--card)] py-12 px-4 mt-16 rounded-xl shadow-lg">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[var(--foreground)] text-center">Book Collection</h2>
          <p className="text-[var(--accent)] text-center mt-2">
            Books do not appear in order read here. See spreadsheet for more detailed breakdown.
          </p>
        </div>
        <ReadsTable books={books} />
      </section>

      {/* Quote Section */}
      <section className="max-w-4xl mx-auto px-4 py-24 text-center">
        <blockquote className="text-2xl font-serif italic text-[var(--foreground)]">
          "A reader lives a thousand lives before he dies. The man who never reads lives only one."
        </blockquote>
        <p className="text-[var(--accent)] mt-4">― George R.R. Martin</p>
      </section>

      {/* World Map Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Where I Read</h2>
          <p className="text-[var(--accent)] mt-2">
            Exploring literature around the globe. Hover over countries to see where I've read titles from.
          </p>
        </div>
        <div className="relative bg-[var(--card)] rounded-xl p-6 shadow-lg mb-12">
          <div 
            style={{ width: "100%", height: "600px", position: "relative" }}
            onDoubleClick={handleDoubleClick}
            onMouseMove={handleMouseMove}
          >
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 150,
                center: [0, 30]
              }}
              style={{
                width: "100%",
                height: "100%"
              }}
            >
              <ZoomableGroup
                zoom={position.zoom}
                center={position.coordinates}
                onMoveEnd={handleMoveEnd}
                onMove={handleMove}
                minZoom={1}
                maxZoom={4}
                translateExtent={[
                  [-180, -90],
                  [180, 90]
                ]}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const countryCode = geo.id; // Use numeric code
                      const stat = countryBookStats[countryCode];
                      const isVisited = !!stat;
                      const countryName = stat ? stat.name : (countryData[countryCode]?.name || geo.properties.name);
                      
                      // Debug: Log country codes for visited countries
                      if (isVisited) {
                        console.log(`🗺️ Found visited country: ${countryName} (${countryCode}) with ${stat.count} books`);
                      }
                      
                      // Debug: Log first few countries to see their properties
                      if (geo.rsmKey === '0') {
                        console.log('🗺️ First country properties:', geo.properties);
                        console.log('🗺️ Available properties:', Object.keys(geo.properties));
                        console.log('🗺️ geo.id:', geo.id);
                        console.log('🗺️ NAME:', geo.properties.NAME);
                        console.log('🗺️ name:', geo.properties.name);
                      }
                      return (
                        <g key={geo.rsmKey} aria-label={countryName}>
                          <Geography
                            geography={geo}
                            onMouseEnter={() => {
                              setHoveredCountry(countryCode);
                              setHoveredCountryName(countryName);
                            }}
                            onMouseLeave={() => {
                              setHoveredCountry(null);
                              setMousePosition(null);
                              setHoveredCountryName(null);
                            }}
                            onClick={() => handleCountryClick(countryCode)}
                            tabIndex={-1}
                            style={{
                              default: {
                                fill: isVisited ? "var(--highlight)" : "var(--accent)",
                                stroke: "var(--foreground)",
                                strokeWidth: 0.5,
                                outline: "none",
                                opacity: 0.75,
                                cursor: isVisited ? "pointer" : "grab"
                              },
                              hover: {
                                fill: "var(--highlight)",
                                stroke: "var(--foreground)",
                                strokeWidth: 1,
                                outline: "none",
                                opacity: 1,
                                cursor: isVisited ? "pointer" : "grab"
                              },
                              pressed: {
                                cursor: "grabbing"
                              }
                            }}
                          />
                        </g>
                      );
                    })
                  }
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>

            {/* Hover Tooltip */}
            {hoveredCountryName && mousePosition && (
              <div 
                className="fixed z-50 px-2 py-1 bg-[var(--background)] text-[var(--foreground)] border border-[var(--accent)] rounded shadow-lg text-sm pointer-events-none"
                style={{
                  left: `${mousePosition.x}px`,
                  top: `${mousePosition.y - 30}px`,
                }}
              >
                {hoveredCountryName}
              </div>
            )}
          </div>

          {/* Map Instructions */}
          <div className="absolute top-2 right-2 bg-[var(--background)] p-2 rounded-lg shadow-md text-xs text-[var(--accent)] space-y-1">
            <div className="flex items-center gap-1">
              <span>🖱️</span>
              <span>Scroll: zoom</span>
            </div>
            <div className="flex items-center gap-1">
              <span>🖱️</span>
              <span>Drag: pan</span>
            </div>
            <button
              onClick={handleDoubleClick}
              className="w-full mt-1 px-2 py-1 bg-[var(--highlight)] text-[var(--background)] rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-1 text-xs"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Reset
            </button>
          </div>

          {/* Color Key */}
          <div className="absolute bottom-2 right-2 bg-[var(--background)] p-3 rounded-lg shadow-md text-xs text-[var(--accent)]">
            <div className="font-semibold mb-2 text-[var(--foreground)]">Legend</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded-sm" style={{ backgroundColor: 'var(--highlight)' }}></div>
                <span>Read from</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 rounded-sm" style={{ backgroundColor: 'var(--accent)' }}></div>
                <span>Not yet read</span>
              </div>
            </div>
          </div>

          {/* Country Information */}
          {hoveredCountry && countryBookStats[hoveredCountry] && (
            <div className="absolute bottom-8 left-8 bg-[var(--background)] p-6 rounded-lg shadow-xl border-2 border-[var(--accent)] max-w-md max-h-96 overflow-hidden">
              <h2 className="text-2xl font-bold mb-2 text-[var(--foreground)]">
                {countryBookStats[hoveredCountry].name}
              </h2>
              <p className="text-[var(--accent)] mb-2">
                {countryBookStats[hoveredCountry].count} book{countryBookStats[hoveredCountry].count > 1 ? 's' : ''} read
              </p>
              <div className="max-h-48 overflow-y-auto">
                <ul className="list-disc list-inside text-[var(--foreground)] text-sm space-y-1">
                  {countryBookStats[hoveredCountry].titles.slice(0, 10).map((title, idx) => (
                    <li key={idx} className="break-words">{title}</li>
                  ))}
                  {countryBookStats[hoveredCountry].titles.length > 10 && (
                    <li className="text-[var(--accent)] italic">
                      ... and {countryBookStats[hoveredCountry].titles.length - 10} more
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Spreadsheet Link Section */}
      <section className="max-w-4xl mx-auto px-4 pb-24 text-center">
        <a 
          href="https://docs.google.com/spreadsheets/d/1c6zdCUsDR_oMYe1ZJBxDujmSjtYXUMRKROyUkr72z0Q/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[var(--highlight)] text-[var(--background)] px-8 py-4 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
        >
          View Complete Reading Log
        </a>
        <p className="text-[var(--accent)] mt-4 text-sm">
          Click to see my detailed reading log spreadsheet with more information and statistics
        </p>
      </section>

      {/* Country Books Modal */}
      {selectedCountry && countryBookStats[selectedCountry] && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-[var(--background)] rounded-xl shadow-2xl border-2 border-[var(--accent)] max-w-2xl max-h-[80vh] overflow-hidden mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[var(--accent)]">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-[var(--foreground)]">
                  {countryBookStats[selectedCountry].name}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-[var(--accent)] hover:text-[var(--foreground)] transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-[var(--accent)] mt-2">
                {countryBookStats[selectedCountry].count} book{countryBookStats[selectedCountry].count > 1 ? 's' : ''} read
              </p>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <ul className="space-y-3">
                {countryBookStats[selectedCountry].titles.map((title, idx) => (
                  <li key={idx} className="text-[var(--foreground)] text-lg break-words">
                    {title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 