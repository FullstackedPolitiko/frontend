import React from "react";
import PolitikerCard from "./PolitikerCard";
import type { Politician } from "../api/politicianApi";
import { mockPolitikere } from "../data/mockPolitikere";
import "../style/politikerpage.css";

interface PolitikerPageProps {
    onPolitikerSelected?: (politician: Politician) => void;
}

const PolitikerPage: React.FC<PolitikerPageProps> = ({ onPolitikerSelected }) => {
    return (
        <div className="politiker-page">
            <h1 className="politiker-page-heading">Politikere</h1>
            <p className="politiker-page-count">{mockPolitikere.length} politikere</p>
            <div className="politiker-page-list">
                {mockPolitikere.map((p) => (
                    <PolitikerCard
                        key={p.id}
                        politician={p}
                        onClick={() => onPolitikerSelected?.(p)}
                    />
                ))}
            </div>
        </div>
    );
};

export default PolitikerPage;