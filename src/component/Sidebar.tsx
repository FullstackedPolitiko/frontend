import React, { useState, useRef, useEffect } from "react";
import "../style/sidebar.css";

export interface SearchResult {
  id: string;
  label: string;
  type: "politiker" | "parti" | "sag";
}

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onSearchSelect?: (result: SearchResult) => void;
}

const menuItems = [
  { id: "timeline", label: "Tidslinje", icon: "📅" },
  { id: "sag", label: "Sag", icon: "📄" },
];

const typeLabels: Record<string, string> = {
  politiker: "Politiker",
  parti: "Parti",
  sag: "Sag",
};

const typeIcons: Record<string, string> = {
  politiker: "👤",
  parti: "🏛️",
  sag: "📄",
};

// TODO: Erstat med API-kald eller lokaldatabase
const mockSearch = (query: string): SearchResult[] => {
  if (!query.trim()) return [];

  const allResults: SearchResult[] = [
    { id: "p1", label: "Mette Frederiksen", type: "politiker" },
    { id: "p2", label: "Jakob Ellemann-Jensen", type: "politiker" },
    { id: "p3", label: "Pernille Vermund", type: "politiker" },
    { id: "p4", label: "Pia Olsen Dyhr", type: "politiker" },
    { id: "pa1", label: "Socialdemokratiet", type: "parti" },
    { id: "pa2", label: "Venstre", type: "parti" },
    { id: "pa3", label: "Moderaterne", type: "parti" },
    { id: "pa4", label: "Enhedslisten", type: "parti" },
    { id: "s1", label: "Forslag om ny cykelsti i centrum", type: "sag" },
    { id: "s2", label: "Renovering af byparken", type: "sag" },
    { id: "s3", label: "Godkendelse af kommunebudget", type: "sag" },
  ];

  const lower = query.toLowerCase();
  return allResults.filter((r) => r.label.toLowerCase().includes(lower));
};

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate, onSearchSelect }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeFilter, setActiveFilter] = useState<"politiker" | "parti" | "sag" | null>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const filterTags: { id: "politiker" | "parti" | "sag"; label: string }[] = [
    { id: "politiker", label: "Politiker" },
    { id: "sag", label: "Sag" },
    { id: "parti", label: "Parti" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const all = mockSearch(searchQuery);
      const filtered = activeFilter ? all.filter((r) => r.type === activeFilter) : all;
      setResults(filtered);
      setShowResults(searchQuery.trim().length > 0);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery, activeFilter]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (result: SearchResult) => {
    setShowResults(false);
    setSearchQuery("");
    setSearchFocused(false);
    setActiveFilter(null);
    onSearchSelect?.(result);
  };

  return (
    <nav className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar-header">
        {!collapsed && <span className="sidebar-logo">Politiko</span>}
        <button
          className="sidebar-toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Udvid menu" : "Skjul menu"}
        >
          {collapsed ? "▶" : "◀"}
        </button>
      </div>

      {!collapsed && (
        <div className="sidebar-search" ref={searchRef}>
          <input
            type="text"
            className="sidebar-search-input"
            placeholder="Søg politiker, parti, sag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setSearchFocused(true);
              if (searchQuery.trim()) setShowResults(true);
            }}
          />
          {searchFocused && (
            <div className="sidebar-filter-tags">
              {filterTags.map((tag) => (
                <button
                  key={tag.id}
                  className={`sidebar-filter-tag ${activeFilter === tag.id ? "sidebar-filter-tag-active" : ""}`}
                  onClick={() => setActiveFilter(activeFilter === tag.id ? null : tag.id)}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          )}
          {showResults && (
            <div className="sidebar-search-results">
              {results.length > 0 ? (
                results.map((r) => (
                  <button
                    key={r.id}
                    className="sidebar-search-item"
                    onClick={() => handleSelect(r)}
                  >
                    <span className="sidebar-search-icon">{typeIcons[r.type]}</span>
                    <span className="sidebar-search-label">{r.label}</span>
                    <span className="sidebar-search-type">{typeLabels[r.type]}</span>
                  </button>
                ))
              ) : (
                <div className="sidebar-search-empty">Ingen resultater</div>
              )}
            </div>
          )}
        </div>
      )}

      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              className={`sidebar-item ${activePage === item.id ? "sidebar-item-active" : ""}`}
              onClick={() => onNavigate(item.id)}
              title={item.label}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {!collapsed && <span className="sidebar-label">{item.label}</span>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
