import YearRow from "./YearRow";
import "../style/timeline.css"
import { DownOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { Case } from "../model/Case";
import usePagination from "../hooks/usePagination";
import { useLoadmore } from "../hooks/useLoadmore";

{/* ---------------------------------------------------------------------
    Component: Timeline
    Purpose: It displays the given objekt of cases on a timeline that goes from the given start-year to end-year
    --------------------------------------------------------------------- */}

interface props {
    startyear: number;
    endyear: number;
    cases: Case[] //TODO: make into a map with year as key
}

function Timeline({ startyear, endyear, cases }: props) {
    const years = [];
    for (let i = startyear; i <= endyear; i++) {
        years.push(i);
    }

    const { visibleCases, handleLoadMore, hasMore } = useLoadmore({
        cases: cases,
        initialCount: 2
    })

    const { visibleYears, next, back } = usePagination({
        items: years,
        itemsToShow: 6
    })

    return (
        <div className="timeline-wrapper">
            <div className="timeline">
                {visibleYears.map((year) => (
                    <YearRow key={year} year={year.toString()} cases={visibleCases} />
                ))}
            </div>

            <div className="timeline-controls">
                <button className="button" onClick={back}>
                    <LeftOutlined />
                </button>
                {hasMore ?
                    <button className="button" onClick={() => handleLoadMore()}>
                        <DownOutlined />
                    </button> : null
                }
                <button className="button" onClick={next}>
                    <RightOutlined />
                </button>
            </div>
        </div>
    );
}

export default Timeline