import React from "react";
import type { Party } from "../api/partyAPI";
import "../style/particard.css";

interface PartiCardProps {
    parti: Party;
    onClick?: () => void;
}

const PartiCard: React.FC<PartiCardProps> = ({ parti, onClick }) => {
    return (
        <button className="parti-card" onClick={onClick}>
            <div className="parti-card-top">
                <span className="parti-shortname">{parti.shortName}</span>
                <span className="parti-mandates">{parti.mandates} mandater</span>
            </div>
            <h3 className="parti-fullname">{parti.fullName}</h3>
            <p className="parti-meta">
                Stiftet {parti.foundedYear} · {parti.members.length} medlem{parti.members.length === 1 ? "" : "mer"}
            </p>
        </button>
    );
};

export default PartiCard;