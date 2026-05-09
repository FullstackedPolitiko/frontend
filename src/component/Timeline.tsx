import YearRow from "./YearRow";
import "../style/timeline.css"
import { DownOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { Case } from "../model/Case";
import usePagination from "../hooks/usePagination";
import { useLoadmore } from "../hooks/useLoadmore";

interface props {
    startyear: number;
    endyear: number;
    cases: Case[];
    onCaseSelected: (caseId: string | number) => void;
}

function Timeline({ startyear, endyear, cases, onCaseSelected }: props) {
    const years = [];
    for (let i = startyear; i <= endyear; i++) {
        years.push(i);
    }

    const { visibleCases, handleLoadMore, hasMore } = useLoadmore({
        cases: cases,
        initialCount: 2
    });

    const { visibleYears, next, back } = usePagination({
        items: years,
        itemsToShow: 6
    });

    return (
        <div className="timeline-wrapper">
            <div className="timeline">
                {visibleYears.map((year) => (
                    <YearRow
                        key={year}
                        year={year.toString()}
                        cases={visibleCases}
                        onCaseSelected={onCaseSelected}
                    />
                ))}
            </div>

            <div className="timeline-controls">
                <button className="button" onClick={back}>
                    <LeftOutlined />
                </button>
                {hasMore ? (
                    <button className="button" onClick={() => handleLoadMore()}>
                        <DownOutlined />
                    </button>
                ) : null}
                <button className="button" onClick={next}>
                    <RightOutlined />
                </button>
            </div>
        </div>
    );
}

export default Timeline;