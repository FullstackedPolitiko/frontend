import React from "react";
import "../style/sagcard.css";

interface Sag {
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
}

const formatDate = (dateStr: string | null): string => {
  if (!dateStr) return "—";
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("da-DK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
};

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

const SagCard: React.FC<SagCardProps> = ({ sag }) => {
  return (
    <div className="sag-card">
      <div className="sag-card-header">
        <div className="sag-card-title-row">
          <span className="sag-nummer">
            {sag.nummerprefix}
            {sag.nummernumerisk}
            {sag.nummerpostfix}
          </span>
          <StatusBadge statusid={sag.statusid} />
        </div>
        <h2 className="sag-titel">{sag.titel}</h2>
        {sag.titelkort && sag.titelkort !== sag.titel && (
          <p className="sag-titelkort">{sag.titelkort}</p>
        )}
      </div>

      {sag.resume && (
        <div className="sag-card-section">
          <h3>Resumé</h3>
          <p className="sag-resume">{sag.resume}</p>
        </div>
      )}

      <div className="sag-card-details">
        <div className="sag-detail-row">
          <span className="sag-label">Afgørelse</span>
          <span className="sag-value">{sag.afgørelse || "—"}</span>
        </div>
        <div className="sag-detail-row">
          <span className="sag-label">Afgørelsesdato</span>
          <span className="sag-value">{formatDate(sag.afgørelsesdato)}</span>
        </div>
        <div className="sag-detail-row">
          <span className="sag-label">Resultat</span>
          <span className="sag-value">{sag.afgørelsesresultatkode || "—"}</span>
        </div>

        {sag.afstemningskonklusion && (
          <div className="sag-detail-row">
            <span className="sag-label">Afstemning</span>
            <span className="sag-value">{sag.afstemningskonklusion}</span>
          </div>
        )}

        <div className="sag-detail-row">
          <span className="sag-label">Lovnummer</span>
          <span className="sag-value">
            {sag.lovnummer ? `${sag.lovnummer} (${formatDate(sag.lovnummerdato)})` : "—"}
          </span>
        </div>

        {sag.paragraf && (
          <div className="sag-detail-row">
            <span className="sag-label">Paragraf</span>
            <span className="sag-value">§{sag.paragrafnummer} – {sag.paragraf}</span>
          </div>
        )}

        <div className="sag-detail-row">
          <span className="sag-label">Opdateret</span>
          <span className="sag-value">{formatDate(sag.opdateringsdato)}</span>
        </div>

        {sag.statsbudgetsag && (
          <div className="sag-detail-row">
            <span className="sag-label">Statsbudgetsag</span>
            <span className="sag-value sag-budget-tag">Ja</span>
          </div>
        )}
      </div>

      {sag.retsinformationsurl && (
        <div className="sag-card-footer">
          <a
            href={sag.retsinformationsurl}
            target="_blank"
            rel="noopener noreferrer"
            className="sag-link"
          >
            Se på Retsinformation ↗
          </a>
        </div>
      )}
    </div>
  );
};

export default SagCard;
