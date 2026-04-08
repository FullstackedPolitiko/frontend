import React, { useState, useEffect } from "react";
import type { Sag } from "./SagCard";
import "../style/searchpage.css";

interface SearchResult {
  id: string;
  label: string;
  type: "politiker" | "parti" | "sag";
}

interface SearchPageProps {
  onResultClick?: (result: SearchResult) => void;
  onSagSelected?: (sag: Sag) => void;
}

const typeLabels: Record<string, string> = {
  politiker: "Politikere",
  parti: "Partier",
  sag: "Sager",
};

const typeIcons: Record<string, string> = {
  politiker: "👤",
  parti: "🏛️",
  sag: "📄",
};

const exampleSearches: SearchResult[] = [
  { id: "ex1", label: "Mette Frederiksen", type: "politiker" },
  { id: "ex2", label: "Socialdemokratiet", type: "parti" },
  { id: "ex3", label: "Finansloven", type: "sag" },
];

// TODO: Replace with actual API data
const mockSager: Sag[] = [
  {
    id: 1234,
    titel: "Forslag til lov om ændring af straffeloven",
    titelkort: "Ændring af straffeloven",
    resume: "Lovforslaget har til formål at skærpe straffen for visse former for kriminalitet samt at modernisere dele af straffelovens bestemmelser.",
    nummer: "L 42",
    nummernumerisk: "42",
    nummerprefix: "L ",
    nummerpostfix: "",
    lovnummer: "LOV nr 567",
    lovnummerdato: "2025-06-15T00:00:00",
    afgørelse: "Vedtaget",
    afgørelsesdato: "2025-05-20T00:00:00",
    afgørelsesresultatkode: "Vedtaget",
    afstemningskonklusion: "For: 87, Imod: 23, Hverken for eller imod: 3",
    begrundelse: "",
    baggrundsmateriale: "",
    offentlighedskode: "O",
    paragraf: "Straffeloven",
    paragrafnummer: 81,
    periodeid: 160,
    kategoriid: 15,
    statusid: 2,
    typeid: 3,
    deltundersagid: 0,
    fremsatundersagid: 0,
    retsinformationsurl: "https://www.retsinformation.dk/eli/lta/2025/567",
    rådsmødedato: "",
    opdateringsdato: "2025-06-01T00:00:00",
    statsbudgetsag: false,
  },
  {
    id: 1235,
    titel: "Forslag til lov om grøn omstilling af transportsektoren",
    titelkort: "Grøn transport",
    resume: "Lovforslaget indfører nye krav til elektrificering af den offentlige transport og incitamenter for private elbiler.",
    nummer: "L 78",
    nummernumerisk: "78",
    nummerprefix: "L ",
    nummerpostfix: "",
    lovnummer: "",
    lovnummerdato: "",
    afgørelse: "",
    afgørelsesdato: "",
    afgørelsesresultatkode: "",
    afstemningskonklusion: "",
    begrundelse: "Klimamål kræver hurtigere omstilling.",
    baggrundsmateriale: "",
    offentlighedskode: "O",
    paragraf: "",
    paragrafnummer: 0,
    periodeid: 160,
    kategoriid: 12,
    statusid: 1,
    typeid: 3,
    deltundersagid: 0,
    fremsatundersagid: 0,
    retsinformationsurl: "",
    rådsmødedato: "",
    opdateringsdato: "2025-09-10T00:00:00",
    statsbudgetsag: false,
  },
  {
    id: 1236,
    titel: "Finansloven 2025",
    titelkort: "Finansloven",
    resume: "Den årlige finanslov med bevillinger til samtlige ministerier og statslige institutioner.",
    nummer: "L 1",
    nummernumerisk: "1",
    nummerprefix: "L ",
    nummerpostfix: "",
    lovnummer: "LOV nr 1001",
    lovnummerdato: "2024-12-20T00:00:00",
    afgørelse: "Vedtaget",
    afgørelsesdato: "2024-12-19T00:00:00",
    afgørelsesresultatkode: "Vedtaget",
    afstemningskonklusion: "For: 95, Imod: 80, Hverken for eller imod: 4",
    begrundelse: "",
    baggrundsmateriale: "",
    offentlighedskode: "O",
    paragraf: "",
    paragrafnummer: 0,
    periodeid: 159,
    kategoriid: 1,
    statusid: 2,
    typeid: 1,
    deltundersagid: 0,
    fremsatundersagid: 0,
    retsinformationsurl: "https://www.retsinformation.dk/eli/lta/2024/1001",
    rådsmødedato: "",
    opdateringsdato: "2025-01-05T00:00:00",
    statsbudgetsag: true,
  },
  {
    id: 1237,
    titel: "Forslag om udvidelse af dagpengeperioden",
    titelkort: "Dagpengeperiode",
    resume: "Forslaget vil forlænge dagpengeperioden fra to til tre år for alle forsikrede ledige.",
    nummer: "B 45",
    nummernumerisk: "45",
    nummerprefix: "B ",
    nummerpostfix: "",
    lovnummer: "",
    lovnummerdato: "",
    afgørelse: "Forkastet",
    afgørelsesdato: "2025-03-15T00:00:00",
    afgørelsesresultatkode: "Forkastet",
    afstemningskonklusion: "For: 52, Imod: 63, Hverken for eller imod: 4",
    begrundelse: "",
    baggrundsmateriale: "",
    offentlighedskode: "O",
    paragraf: "",
    paragrafnummer: 0,
    periodeid: 160,
    kategoriid: 8,
    statusid: 2,
    typeid: 5,
    deltundersagid: 0,
    fremsatundersagid: 0,
    retsinformationsurl: "",
    rådsmødedato: "",
    opdateringsdato: "2025-03-20T00:00:00",
    statsbudgetsag: false,
  },
  {
    id: 1238,
    titel: "Forslag om reform af folkeskolen",
    titelkort: "Folkeskolereform",
    resume: "En ny reform der sigter mod kortere skoledage, mere frihed til lærerne og styrkelse af de humanistiske fag.",
    nummer: "L 112",
    nummernumerisk: "112",
    nummerprefix: "L ",
    nummerpostfix: "",
    lovnummer: "",
    lovnummerdato: "",
    afgørelse: "",
    afgørelsesdato: "",
    afgørelsesresultatkode: "",
    afstemningskonklusion: "",
    begrundelse: "",
    baggrundsmateriale: "",
    offentlighedskode: "O",
    paragraf: "",
    paragrafnummer: 0,
    periodeid: 160,
    kategoriid: 10,
    statusid: 3,
    typeid: 3,
    deltundersagid: 0,
    fremsatundersagid: 0,
    retsinformationsurl: "",
    rådsmødedato: "",
    opdateringsdato: "2025-08-01T00:00:00",
    statsbudgetsag: false,
  },
];

// TODO: Replace with actual API call
const mockFullSearch = (query: string): SearchResult[] => {
  const allResults: SearchResult[] = [
    { id: "p1", label: "Mette Frederiksen", type: "politiker" },
    { id: "p2", label: "Jakob Ellemann-Jensen", type: "politiker" },
    { id: "p3", label: "Pernille Vermund", type: "politiker" },
    { id: "p4", label: "Pia Olsen Dyhr", type: "politiker" },
    { id: "p5", label: "Lars Løkke Rasmussen", type: "politiker" },
    { id: "pa1", label: "Socialdemokratiet", type: "parti" },
    { id: "pa2", label: "Venstre", type: "parti" },
    { id: "pa3", label: "Moderaterne", type: "parti" },
    { id: "pa4", label: "Enhedslisten", type: "parti" },
    { id: "pa5", label: "Dansk Folkeparti", type: "parti" },
    { id: "s1234", label: "Forslag til lov om ændring af straffeloven", type: "sag" },
    { id: "s1235", label: "Forslag til lov om grøn omstilling af transportsektoren", type: "sag" },
    { id: "s1236", label: "Finansloven 2025", type: "sag" },
    { id: "s1237", label: "Forslag om udvidelse af dagpengeperioden", type: "sag" },
    { id: "s1238", label: "Forslag om reform af folkeskolen", type: "sag" },
  ];

  if (!query.trim()) return allResults;
  const lower = query.toLowerCase();
  return allResults.filter((r) => r.label.toLowerCase().includes(lower));
};

const SearchPage: React.FC<SearchPageProps> = ({ onResultClick, onSagSelected }) => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"politiker" | "parti" | "sag" | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Reactively search as the user types or changes filter
  useEffect(() => {
    if (!query.trim() && !activeFilter) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    const timer = setTimeout(() => {
      setHasSearched(true);
      const all = mockFullSearch(query);
      const filtered = activeFilter ? all.filter((r) => r.type === activeFilter) : all;
      setResults(filtered);
    }, 200);
    return () => clearTimeout(timer);
  }, [query, activeFilter]);

  const handleSubmit = () => {
    if (!query.trim() && !activeFilter) return;
    setHasSearched(true);
    const all = mockFullSearch(query);
    const filtered = activeFilter ? all.filter((r) => r.type === activeFilter) : all;
    setResults(filtered);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const handleExampleClick = (example: SearchResult) => {
    setQuery(example.label);
  };

  const handleFilterToggle = (filter: "politiker" | "parti" | "sag") => {
    const next = activeFilter === filter ? null : filter;
    setActiveFilter(next);
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.type === "sag" && onSagSelected) {
      const sagId = parseInt(result.id.replace("s", ""), 10);
      const sag = mockSager.find((s) => s.id === sagId);
      if (sag) {
        onSagSelected(sag);
        return;
      }
    }
    onResultClick?.(result);
  };

  // Group results by type
  const grouped: Record<string, SearchResult[]> = {};
  for (const r of results) {
    if (!grouped[r.type]) grouped[r.type] = [];
    grouped[r.type].push(r);
  }

  const sections = activeFilter
    ? [activeFilter]
    : (["politiker", "parti", "sag"] as const).filter((t) => grouped[t]);

  const filteredExamples = activeFilter
    ? exampleSearches.filter((ex) => ex.type === activeFilter)
    : exampleSearches;

  return (
    <div className="search-page">
      {/* Search input area */}
      <div className="search-page-bar">
        <div className="search-input-wrapper">
          <svg
            className="search-input-icon"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="search-page-input"
            placeholder="Søg efter politiker, parti eller sag..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>

        <div className="search-page-tags">
          {(
            [
              { id: "politiker", label: "Politiker" },
              { id: "parti", label: "Parti" },
              { id: "sag", label: "Sag" },
            ] as const
          ).map((tag) => (
            <button
              key={tag.id}
              className={`search-tag ${activeFilter === tag.id ? "search-tag-active" : ""}`}
              onClick={() => handleFilterToggle(tag.id)}
            >
              {typeIcons[tag.id]} {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Examples (before search) */}
      {!hasSearched && (
        <div className="search-examples">
          <span className="search-examples-label">Prøv f.eks.</span>
          <div className="search-examples-list">
            {filteredExamples.map((ex) => (
              <button
                key={ex.id}
                className="search-example-chip"
                onClick={() => handleExampleClick(ex)}
              >
                {typeIcons[ex.type]} {ex.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {hasSearched && (
        <div className="search-results-area">
          <p className="search-results-count">
            {results.length} {results.length === 1 ? "resultat" : "resultater"}
            {activeFilter && ` i ${typeLabels[activeFilter].toLowerCase()}`}
            {query && (
              <>
                {" "}for "<strong>{query}</strong>"
              </>
            )}
          </p>

          {results.length === 0 ? (
            <div className="search-no-results">
              <p>Ingen resultater fundet.</p>
              <p className="search-no-results-hint">
                Prøv et andet søgeord eller fjern filteret.
              </p>
            </div>
          ) : (
            sections.map((type) => (
              <div key={type} className="search-section">
                <h2 className="search-section-title">
                  <span>{typeIcons[type]}</span>
                  {typeLabels[type]}
                  <span className="search-section-count">
                    ({grouped[type]?.length ?? 0})
                  </span>
                </h2>
                <div className="search-section-list">
                  {grouped[type]?.map((r) => (
                    <button
                      key={r.id}
                      className="search-result-card"
                      onClick={() => handleResultClick(r)}
                    >
                      <span className="search-result-icon">{typeIcons[r.type]}</span>
                      <span className="search-result-label">{r.label}</span>
                      <span className="search-result-arrow">→</span>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
