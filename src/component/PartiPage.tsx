import React from "react";
import PartiCard from "./PartiCard";
import type { Party } from "../api/partyAPI";
import { mockPartier } from "../data/mockPartier";
import "../style/partipage.css";

interface PartiPageProps {
    onPartiSelected?: (parti: Party) => void;
}

const PartiPage: React.FC<PartiPageProps> = ({ onPartiSelected }) => {
    return (
        <div className="parti-page">
            <h1 className="parti-page-heading">Partier</h1>
            <p className="parti-page-count">{mockPartier.length} partier</p>
            <div className="parti-page-list">
                {mockPartier.map((p) => (
                    <PartiCard
                        key={p.shortName}
                        parti={p}
                        onClick={() => onPartiSelected?.(p)}
                    />
                ))}
            </div>
        </div>
    );
};

export default PartiPage;