import React, { useState, useEffect } from "react";
import type { Sag } from "./SagCard";
import type { Politician } from "../api/politicianApi";
import { mockSager } from "../data/mockSager";
import { mockPolitikere } from "../data/mockPolitikere";
import "../style/searchpage.css";
import type { Party } from "../api/partyAPI";
import { mockPartier } from "../data/mockPartier";

interface SearchResult {
  id: string;
  label: string;
  type: "politiker" | "parti" | "sag";
}

interface SearchPageProps {
  onResultClick?: (result: SearchResult) => void;
  onSagSelected?: (sag: Sag) => void;
  onPolitikerSelected?: (politician: Politician) => void;
  onPartiSelected?: (parti: Party) => void;
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

const mockFullSearch = (query: string): SearchResult[] => {
  const politikerResults: SearchResult[] = mockPolitikere.map((p) => ({
    id: `p${p.id}`,
    label: p.navn,
    type: "politiker",
  }));

  const sagResults: SearchResult[] = mockSager.map((s) => ({
    id: `s${s.id}`,
    label: s.titel,
    type: "sag",
  }));

  const partiResults: SearchResult[] = mockPartier.map((p) => ({
    id: `pa-${p.shortName}`,
    label: p.fullName,
    type: "parti",
  }));

  const allResults = [...politikerResults, ...partiResults, ...sagResults];

  if (!query.trim()) return allResults;
  const lower = query.toLowerCase();
  return allResults.filter((r) => r.label.toLowerCase().includes(lower));
};

const SearchPage: React.FC<SearchPageProps> = ({onResultClick, onSagSelected, onPolitikerSelected, onPartiSelected,}) => {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"politiker" | "parti" | "sag" | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
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
    if (result.type === "politiker" && onPolitikerSelected) {
      const politikerId = parseInt(result.id.replace("p", ""), 10);
      const politician = mockPolitikere.find((p) => p.id === politikerId);
      if (politician) {
        onPolitikerSelected(politician);
        return;
      }
    }
    if (result.type === "parti" && onPartiSelected) {
      const shortName = result.id.replace("pa-", "");
      const parti = mockPartier.find((p) => p.shortName === shortName);
      if (parti) {
        onPartiSelected(parti);
        return;
      }
    }
    onResultClick?.(result);
  };

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