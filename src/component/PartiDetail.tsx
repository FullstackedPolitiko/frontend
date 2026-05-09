import React from "react";
import type { Party } from "../api/partyAPI";
import type { Politician } from "../api/politicianApi";
import PolitikerCard from "./PolitikerCard";
import "../style/partidetail.css";

interface PartiDetailProps {
    parti: Party;
    onBack: () => void;
    onPolitikerSelected: (politician: Politician) => void;
}

const PartiDetail: React.FC<PartiDetailProps> = ({ parti, onBack, onPolitikerSelected }) => {
    return (
        <div className="parti-detail">
            <div className="parti-detail-header">
                <div className="parti-detail-header-row">
                    <button className="parti-detail-back" onClick={onBack}>
                        ← Tilbage
                    </button>

                    <h1 className="parti-detail-fullname">{parti.fullName}</h1>

                    <div className="parti-detail-meta">
                        <span className="parti-detail-shortname">{parti.shortName}</span>
                    </div>
                </div>
            </div>

            <div className="parti-detail-section">
                <h2>Detaljer</h2>
                <div className="parti-detail-grid">
                    <div className="parti-detail-row">
                        <span className="parti-detail-label">Forkortelse</span>
                        <span className="parti-detail-value">{parti.shortName}</span>
                    </div>
                    <div className="parti-detail-row">
                        <span className="parti-detail-label">Stiftelsesår</span>
                        <span className="parti-detail-value">{parti.foundedYear}</span>
                    </div>
                    <div className="parti-detail-row">
                        <span className="parti-detail-label">Mandater</span>
                        <span className="parti-detail-value">{parti.mandates}</span>
                    </div>
                    <div className="parti-detail-row">
                        <span className="parti-detail-label">Antal medlemmer</span>
                        <span className="parti-detail-value">{parti.members.length}</span>
                    </div>
                </div>
            </div>

            <div className="parti-detail-section">
                <h2>Medlemmer</h2>
                {parti.members.length === 0 ? (
                    <p className="parti-detail-empty">Ingen medlemmer registreret.</p>
                ) : (
                    <div className="parti-detail-members">
                        {parti.members.map((m) => (
                            <PolitikerCard
                                key={m.id}
                                politician={m}
                                onClick={() => onPolitikerSelected(m)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PartiDetail;