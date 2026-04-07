import { useState } from 'react'
import './App.css'
import Sidebar from './component/Sidebar'
import Timeline from './component/Timeline'
import SagPage from './component/SagPage'
import type { Case } from './model/Case';

function App() {
  const [activePage, setActivePage] = useState("timeline");

  const mockCases: Case[] = [
    {
      id: 1,
      year: 2021,
      casename: "Forslag om ny cykelsti i centrum",
      link: "https://eksempel.dk/sag/1",
      votes: "For: 12, Imod: 3, Blanke: 0",
      attendance: "95%"
    },
    {
      id: 2,
      year: 2021,
      casename: "Renovering af byparken",
      link: "https://eksempel.dk/sag/2",
      votes: "For: 15, Imod: 0, Blanke: 0",
      attendance: "100%"
    },
    {
      id: "sag-3",
      year: 2022,
      casename: "Godkendelse af kommunebudget",
      link: "https://eksempel.dk/sag/3",
      votes: "For: 9, Imod: 6, Blanke: 0",
      attendance: "100%"
    },
    {
      id: 4,
      year: 2023,
      casename: "Udvidelse af skoledistrikt Nord",
      link: "https://eksempel.dk/sag/4",
      votes: "For: 14, Imod: 1, Blanke: 0",
      attendance: "85%"
    }
  ];

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="app-content">
        {activePage === "timeline" && (
          <Timeline startyear={1998} endyear={2026} cases={mockCases} />
        )}
        {activePage === "sag" && <SagPage />}
      </main>
    </div>
  )
}

export default App
