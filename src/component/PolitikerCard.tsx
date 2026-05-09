import React from "react";
import type { Politician } from "../api/politicianApi";
import "../style/politikercard.css";

interface PolitikerCardProps {
    politician: Politician;
    onClick?: () => void;
}

const PolitikerCard: React.FC<PolitikerCardProps> = ({ politician, onClick }) => {
    return (
        <button className="politiker-card" onClick={onClick}>
            <div className="politiker-card-top">
                <span className="politiker-parti">{politician.gruppenavnkort}</span>
                <span className="politiker-id">ID {politician.id}</span>
            </div>
            <h3 className="politiker-navn">{politician.navn}</h3>
            {politician.biografi && (
                <p className="politiker-biografi">{politician.biografi}</p>
            )}
        </button>
    );
};

export default PolitikerCard;