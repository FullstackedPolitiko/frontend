import React from "react";
import type { Politician } from "../api/politicianApi";
import type { Sag } from "./SagCard";
import SagCard from "./SagCard";
import { mockSager } from "../data/mockSager";
import "../style/politikerdetail.css";

interface PolitikerDetailProps {
    politician: Politician;
    onBack: () => void;
    onSagSelected: (sag: Sag) => void;
}

const partyFullNames: Record<string, string> = {
    S: "Socialdemokratiet",
    V: "Venstre",
    M: "Moderaterne",
    KF: "Det Konservative Folkeparti",
    SF: "Socialistisk Folkeparti",
    EL: "Enhedslisten",
    DF: "Dansk Folkeparti",
    DD: "Danmarksdemokraterne",
    LA: "Liberal Alliance",
    RV: "Radikale Venstre",
    ALT: "Alternativet",
};

const PolitikerDetail: React.FC<PolitikerDetailProps> = ({ politician, onBack, onSagSelected }) => {
    const partyFullName = partyFullNames[politician.gruppenavnkort] ?? politician.gruppenavnkort;

    const startIndex = politician.id % Math.max(1, mockSager.length);
    const relatedSager: Sag[] = [
        mockSager[startIndex % mockSager.length],
        mockSager[(startIndex + 1) % mockSager.length],
        mockSager[(startIndex + 2) % mockSager.length],
    ].filter(Boolean);

    return (
        <div className="politiker-detail">
            <div className="politiker-detail-header">
                <div className="politiker-detail-header-row">
                    <button className="politiker-detail-back" onClick={onBack}>
                        ← Tilbage
                    </button>

                    <h1 className="politiker-detail-navn">{politician.navn}</h1>

                    <div className="politiker-detail-meta">
                        <span className="politiker-detail-parti">{politician.gruppenavnkort}</span>
                        <span className="politiker-detail-id">ID {politician.id}</span>
                    </div>
                </div>

                <p className="politiker-detail-parti-fullname">{partyFullName}</p>
            </div>

            {politician.biografi && (
                <div className="politiker-detail-section">
                    <h2>Biografi</h2>
                    <p>{politician.biografi}</p>
                </div>
            )}

            <div className="politiker-detail-section">
                <h2>Detaljer</h2>
                <div className="politiker-detail-grid">
                    <div className="politiker-detail-row">
                        <span className="politiker-detail-label">Fornavn</span>
                        <span className="politiker-detail-value">{politician.fornavn || "—"}</span>
                    </div>
                    <div className="politiker-detail-row">
                        <span className="politiker-detail-label">Efternavn</span>
                        <span className="politiker-detail-value">{politician.efternavn || "—"}</span>
                    </div>
                    <div className="politiker-detail-row">
                        <span className="politiker-detail-label">Parti</span>
                        <span className="politiker-detail-value">{partyFullName}</span>
                    </div>
                    <div className="politiker-detail-row">
                        <span className="politiker-detail-label">Politiker-ID</span>
                        <span className="politiker-detail-value">{politician.id}</span>
                    </div>
                </div>
            </div>

            {relatedSager.length > 0 && (
                <div className="politiker-detail-section">
                    <h2>Relaterede sager</h2>
                    <p className="politiker-detail-mock-note">
                        Eksempel-sager (rigtigt link mellem politiker og sag kommer senere)
                    </p>
                    <div className="politiker-detail-sager">
                        {relatedSager.map((sag) => (
                            <SagCard
                                key={sag.id}
                                sag={sag}
                                onClick={() => onSagSelected(sag)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PolitikerDetail;