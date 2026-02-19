import YearRow from "./YearRow";
import "../style/timeline.css"
import { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { Case } from "../model/Case";

interface props {
    startyear: number;
    endyear: number;
    cases: Case[]
}

function Timeline({ startyear, endyear, cases }: props) {
    const years = [];
    for (let i = startyear; i <= endyear; i++) {
        years.push(i);
    }

    const [currentIndex, setCurrentIndex] = useState(0);

    const itemsToShow = 6;

    const visibleYears = years.slice(currentIndex, currentIndex + itemsToShow);

    return (
        <div>
            <div className="timeline">
                {visibleYears.map((year) => (
                    <YearRow key={year} year={year.toString()} cases={cases} />
                ))}
            </div>

            <br />

            <div>
                <button onClick={() => setCurrentIndex(currentIndex - itemsToShow)}>
                    <LeftOutlined />
                </button>
                <button onClick={() => setCurrentIndex(currentIndex + itemsToShow)}>
                    <RightOutlined />
                </button>
            </div>
        </div>
    );
}

export default Timeline