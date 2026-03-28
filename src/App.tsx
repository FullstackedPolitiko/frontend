import './App.css'
import Timeline from './component/Timeline'
import type { Case } from './model/Case';

function App() {

const mockCases: Case[] = [
  {
    id: 1,
    year: 2021,
    casename: "Forslag 12345",
    link: "https://eksempel.dk/sag/1",
    votes: "For: 12, Imod: 3, Blanke: 0",
    attendance: "95%"
  },
  {
    id: 2,
    year: 2021,
    casename: "2Renovering af byparken",
    link: "https://eksempel.dk/sag/2",
    votes: "For: 15, Imod: 0, Blanke: 0",
    attendance: "100%"
  },
  {
    id: "sag-3", 
    year: 2022,
    casename: "3Godkendelse af kommunebudget",
    link: "https://eksempel.dk/sag/3",
    votes: "For: 9, Imod: 6, Blanke: 0",
    attendance: "100%"
  },
  {
    id: 4,
    year: 2023,
    casename: "4Udvidelse af skoledistrikt Nord",
    link: "https://eksempel.dk/sag/4",
    votes: "For: 14, Imod: 1, Blanke: 0",
    attendance: "85%"
  }
];
  return (
    <div>
      <Timeline startyear={1998} endyear={2026} cases={mockCases}></Timeline>
    </div>
  )
}

export default App
