import React from "react";
import SagCard from "../component/SagCard";
import type { Sag } from "../component/SagCard";
import { mockSager } from "../data/mockSager";
import "../style/sagpage.css";

interface SagPageProps {
  onSagSelected: (sag: Sag) => void;
}

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
