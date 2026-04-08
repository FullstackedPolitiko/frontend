import React from "react";
import type { Sag } from "./SagCard.tsx";
import "../style/sagdetail.css";

interface SagDetailProps {
  sag: Sag;
  onBack: () => void;
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
    1: { label: "Aktiv", className: "detail-status-active" },
    2: { label: "Afsluttet", className: "detail-status-closed" },
    3: { label: "Udsat", className: "detail-status-postponed" },
  };
  const status = statusMap[statusid] ?? {
    label: `Status ${statusid}`,
    className: "detail-status-unknown",
  };
  return <span className={`detail-status ${status.className}`}>{status.label}</span>;
};

const SagDetail: React.FC<SagDetailProps> = ({ sag, onBack }) => {
  return (
    <div className="sag-detail">
      <div className="sag-detail-header">
        <div className="sag-detail-header-row">
          <button className="sag-detail-back" onClick={onBack}>
            ← Tilbage til oversigt
          </button>

          <h1 className="sag-detail-titel">{sag.titel}</h1>

          <div className="sag-detail-meta">
            <span className="sag-detail-nummer">
              {sag.nummerprefix}{sag.nummernumerisk}{sag.nummerpostfix}
            </span>
            <StatusBadge statusid={sag.statusid} />
          </div>
        </div>

        {sag.titelkort && sag.titelkort !== sag.titel && (
          <p className="sag-detail-titelkort">{sag.titelkort}</p>
        )}
      </div>

      {sag.resume && (
        <div className="sag-detail-section">
          <h2>Resumé</h2>
          <p>{sag.resume}</p>
        </div>
      )}

      <div className="sag-detail-section">
        <h2>Detaljer</h2>
        <div className="sag-detail-grid">
          <div className="sag-detail-row">
            <span className="sag-detail-label">Afgørelse</span>
            <span className="sag-detail-value">{sag.afgørelse || "—"}</span>
          </div>
          <div className="sag-detail-row">
            <span className="sag-detail-label">Afgørelsesdato</span>
            <span className="sag-detail-value">{formatDate(sag.afgørelsesdato)}</span>
          </div>
          <div className="sag-detail-row">
            <span className="sag-detail-label">Resultat</span>
            <span className="sag-detail-value">{sag.afgørelsesresultatkode || "—"}</span>
          </div>
          {sag.afstemningskonklusion && (
            <div className="sag-detail-row">
              <span className="sag-detail-label">Afstemning</span>
              <span className="sag-detail-value">{sag.afstemningskonklusion}</span>
            </div>
          )}
          <div className="sag-detail-row">
            <span className="sag-detail-label">Lovnummer</span>
            <span className="sag-detail-value">
              {sag.lovnummer ? `${sag.lovnummer} (${formatDate(sag.lovnummerdato)})` : "—"}
            </span>
          </div>
          {sag.paragraf && (
            <div className="sag-detail-row">
              <span className="sag-detail-label">Paragraf</span>
              <span className="sag-detail-value">§{sag.paragrafnummer} – {sag.paragraf}</span>
            </div>
          )}
          <div className="sag-detail-row">
            <span className="sag-detail-label">Offentlighed</span>
            <span className="sag-detail-value">{sag.offentlighedskode || "—"}</span>
          </div>
          <div className="sag-detail-row">
            <span className="sag-detail-label">Opdateret</span>
            <span className="sag-detail-value">{formatDate(sag.opdateringsdato)}</span>
          </div>
          {sag.statsbudgetsag && (
            <div className="sag-detail-row">
              <span className="sag-detail-label">Statsbudgetsag</span>
              <span className="sag-detail-value sag-detail-budget">Ja</span>
            </div>
          )}
        </div>
      </div>

      {sag.begrundelse && (
        <div className="sag-detail-section">
          <h2>Begrundelse</h2>
          <p>{sag.begrundelse}</p>
        </div>
      )}

      {sag.baggrundsmateriale && (
        <div className="sag-detail-section">
          <h2>Baggrundsmateriale</h2>
          <p>{sag.baggrundsmateriale}</p>
        </div>
      )}

      {sag.retsinformationsurl && (
        <div className="sag-detail-section">
          <a
            href={sag.retsinformationsurl}
            target="_blank"
            rel="noopener noreferrer"
            className="sag-detail-link"
          >
            Se på Retsinformation ↗
          </a>
        </div>
      )}
    </div>
  );
};

export default SagDetail;
