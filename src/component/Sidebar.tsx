import React, { useState } from "react";
import "../style/sidebar.css";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  { id: "search", label: "Søg", icon: "search" },
  { id: "timeline", label: "Tidslinje", icon: "📅" },
  { id: "sag", label: "Sag", icon: "📄" },
];

const SearchIcon = () => (
  <svg
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
);

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const [collapsed, setCollapsed] = useState(false);

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

      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.id}>
            <button
              className={`sidebar-item ${activePage === item.id ? "sidebar-item-active" : ""}`}
              onClick={() => onNavigate(item.id)}
              title={item.label}
            >
              <span className="sidebar-icon">
                {item.icon === "search" ? <SearchIcon /> : item.icon}
              </span>
              {!collapsed && <span className="sidebar-label">{item.label}</span>}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
