import React from "react";
import SagCard from "../component/SagCard";
import "../style/sagpage.css";

// TODO: Erstat med rigtig data
const mockSag = {
  id: 1234,
  titel: "Forslag til lov om ændring af straffeloven",
  titelkort: "Ændring af straffeloven",
  resume:
    "Lovforslaget har til formål at skærpe straffen for visse former for kriminalitet samt at modernisere dele af straffelovens bestemmelser.",
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
};

const SagPage: React.FC = () => {
  return (
    <div className="sag-page">
      <h1 className="sag-page-heading">Sag</h1>
      <SagCard sag={mockSag} />
    </div>
  );
};

export default SagPage;
