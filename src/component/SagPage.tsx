import React from "react";
import SagCard from "../component/SagCard";
import type { Sag } from "../component/SagCard";
import "../style/sagpage.css";

interface SagPageProps {
  onSagSelected: (sag: Sag) => void;
}

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

const SagPage: React.FC<SagPageProps> = ({ onSagSelected }) => {
  return (
    <div className="sag-page">
      <h1 className="sag-page-heading">Sager</h1>
      <p className="sag-page-count">{mockSager.length} sager</p>
      <div className="sag-page-list">
        {mockSager.map((sag) => (
          <SagCard
            key={sag.id}
            sag={sag}
            onClick={() => onSagSelected(sag)}
          />
        ))}
      </div>
    </div>
  );
};

export default SagPage;
