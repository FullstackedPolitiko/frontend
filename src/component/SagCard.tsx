import React from "react";
import "../style/sagcard.css";

export interface Sag {
  id: number;
  titel: string;
  titelkort: string;
  resume: string;
  nummer: string;
  nummernumerisk: string;
  nummerprefix: string;
  nummerpostfix: string;
  lovnummer: string;
  lovnummerdato: string;
  afgørelse: string;
  afgørelsesdato: string;
  afgørelsesresultatkode: string;
  afstemningskonklusion: string;
  begrundelse: string;
  baggrundsmateriale: string;
  offentlighedskode: string;
  paragraf: string;
  paragrafnummer: number;
  periodeid: number;
  kategoriid: number;
  statusid: number;
  typeid: number;
  deltundersagid: number;
  fremsatundersagid: number;
  retsinformationsurl: string;
  rådsmødedato: string;
  opdateringsdato: string;
  statsbudgetsag: boolean;
}

interface SagCardProps {
  sag: Sag;
  onClick?: () => void;
}

const StatusBadge: React.FC<{ statusid: number }> = ({ statusid }) => {
  const statusMap: Record<number, { label: string; className: string }> = {
    1: { label: "Aktiv", className: "status-active" },
    2: { label: "Afsluttet", className: "status-closed" },
    3: { label: "Udsat", className: "status-postponed" },
  };
  const status = statusMap[statusid] ?? {
    label: `Status ${statusid}`,
    className: "status-unknown",
  };
  return <span className={`sag-status ${status.className}`}>{status.label}</span>;
};

const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return "—";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("da-DK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
};

const SagCard: React.FC<SagCardProps> = ({ sag, onClick }) => {
  return (
    <button className="sag-card" onClick={onClick}>
      <div className="sag-card-top">
        <span className="sag-nummer">
          {sag.nummerprefix}{sag.nummernumerisk}{sag.nummerpostfix}
        </span>
        <StatusBadge statusid={sag.statusid} />
      </div>
      <h3 className="sag-titel">{sag.titel}</h3>
      {sag.titelkort && sag.titelkort !== sag.titel && (
        <p className="sag-titelkort">{sag.titelkort}</p>
      )}
      <div className="sag-card-meta">
        <span>{sag.afgørelse || "Ingen afgørelse"}</span>
        <span>{formatDate(sag.afgørelsesdato)}</span>
      </div>
    </button>
  );
};

export default SagCard;
