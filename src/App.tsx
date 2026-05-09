import { useState } from 'react'
import './App.css'
import Sidebar from './component/Sidebar'
import Timeline from './component/Timeline'
import SagPage from './component/SagPage'
import SagDetail from './component/SagDetail'
import SearchPage from './component/SearchPage'
import PolitikerPage from './component/PolitikerPage'
import PolitikerDetail from './component/PolitikerDetail'
import PartiPage from './component/PartiPage'
import PartiDetail from './component/PartiDetail'
import { mockSager } from './data/mockSager'
import type { Sag } from './component/SagCard'
import type { Politician } from './api/politicianApi'
import type { Party } from './api/partyAPI'
import type { Case } from './model/Case'

function App() {
  const [activePage, setActivePage] = useState("timeline");
  const [selectedSag, setSelectedSag] = useState<Sag | null>(null);
  const [selectedPolitician, setSelectedPolitician] = useState<Politician | null>(null);
  const [selectedParti, setSelectedParti] = useState<Party | null>(null);
  const [previousPage, setPreviousPage] = useState<string>("search");

  const handleNavigate = (page: string) => {
    setActivePage(page);
    setSelectedSag(null);
    setSelectedPolitician(null);
    setSelectedParti(null);
  };

  const handleSagSelected = (sag: Sag, fromPage: string) => {
    setSelectedSag(sag);
    setPreviousPage(fromPage);
    setActivePage("sagdetail");
  };

  const handlePolitikerSelected = (politician: Politician, fromPage: string) => {
    setSelectedPolitician(politician);
    setPreviousPage(fromPage);
    setActivePage("politikerdetail");
  };

  const handlePartiSelected = (parti: Party, fromPage: string) => {
    setSelectedParti(parti);
    setPreviousPage(fromPage);
    setActivePage("partidetail");
  };

  const handleCaseSelected = (caseId: string | number) => {
    const numericId = typeof caseId === "string" ? parseInt(caseId, 10) : caseId;
    const sag = mockSager.find((s) => s.id === numericId);
    if (sag) {
      handleSagSelected(sag, "timeline");
    } else {
      console.warn(`No sag found for case id ${caseId}`);
    }
  };

  const handleBackFromDetail = () => {
    if (activePage === "sagdetail") setSelectedSag(null);
    if (activePage === "politikerdetail") setSelectedPolitician(null);
    if (activePage === "partidetail") setSelectedParti(null);
    setActivePage(previousPage);
  };

  const mockCases: Case[] = [
    {
      id: 2001,
      year: 2021,
      casename: "Forslag om ny cykelsti i centrum",
      link: "https://www.retsinformation.dk/eli/lta/2021/412",
      votes: "For: 12, Imod: 3, Blanke: 0",
      attendance: "95%"
    },
    {
      id: 2002,
      year: 2021,
      casename: "Renovering af byparken",
      link: "https://www.retsinformation.dk/eli/lta/2021/489",
      votes: "For: 15, Imod: 0, Blanke: 0",
      attendance: "100%"
    },
    {
      id: 2003,
      year: 2022,
      casename: "Godkendelse af kommunebudget",
      link: "https://www.retsinformation.dk/eli/lta/2022/1745",
      votes: "For: 9, Imod: 6, Blanke: 0",
      attendance: "100%"
    },
    {
      id: 2004,
      year: 2023,
      casename: "Udvidelse af skoledistrikt Nord",
      link: "https://www.retsinformation.dk/eli/lta/2023/678",
      votes: "For: 14, Imod: 1, Blanke: 0",
      attendance: "85%"
    }
  ];

  return (
      <div className="app-layout">
        <Sidebar activePage={activePage} onNavigate={handleNavigate} />
        <main className="app-content">
          {activePage === "timeline" && (
              <Timeline
                  startyear={1998}
                  endyear={2026}
                  cases={mockCases}
                  onCaseSelected={handleCaseSelected}
              />
          )}
          {activePage === "sag" && (
              <SagPage onSagSelected={(sag) => handleSagSelected(sag, "sag")} />
          )}
          {activePage === "politiker" && (
              <PolitikerPage onPolitikerSelected={(p) => handlePolitikerSelected(p, "politiker")} />
          )}
          {activePage === "parti" && (
              <PartiPage onPartiSelected={(p) => handlePartiSelected(p, "parti")} />
          )}
          {activePage === "search" && (
              <SearchPage
                  onSagSelected={(sag) => handleSagSelected(sag, "search")}
                  onPolitikerSelected={(p) => handlePolitikerSelected(p, "search")}
                  onPartiSelected={(p) => handlePartiSelected(p, "search")}
              />
          )}
          {activePage === "sagdetail" && selectedSag && (
              <SagDetail sag={selectedSag} onBack={handleBackFromDetail} />
          )}
          {activePage === "politikerdetail" && selectedPolitician && (
              <PolitikerDetail
                  politician={selectedPolitician}
                  onBack={handleBackFromDetail}
                  onSagSelected={(sag) => handleSagSelected(sag, "politikerdetail")}
              />
          )}
          {activePage === "partidetail" && selectedParti && (
              <PartiDetail
                  parti={selectedParti}
                  onBack={handleBackFromDetail}
                  onPolitikerSelected={(p) => handlePolitikerSelected(p, "partidetail")}
              />
          )}
        </main>
      </div>
  )
}

export default App