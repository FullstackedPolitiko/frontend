import YearRow from "./YearRow";
import "../style/timeline.css"
import { DownOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import type { Case } from "../model/Case";
import { useLoadmore } from "../hooks/useLoadMore";
import usePagination from "../hooks/usePagination";


interface props {
    startyear: number;
    endyear: number;
    cases: Case[] //TODO make into a map with year as key
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

    const { visibleYears, goForward, goBack } = usePagination({
        years: years,
        itemsToShow: 6
    })

    return (
        <div style={{ display: "flex" }}>

            <div>
                <div className="timeline">
                    {visibleYears.map((year) => (
                        <YearRow key={year} year={year.toString()} cases={visibleCases} />
                    ))}
                </div>

                <br />

                <div>
                    {hasMore ?
                        <button className="button" onClick={() => handleLoadMore()}>
                            <DownOutlined />
                        </button> : null
                    }
                </div>
            </div>

            <div style={{ display: "flex", width: "fit-content", height: "fit-content", justifyContent: "center" }}>
                
                <button className="button" onClick={() => goBack()}>
                    <LeftOutlined />
                </button>
                <button className="button" onClick={() => goForward()}>
                    <RightOutlined />
                </button>
            </div>
        </div>

    );
}

export default Timeline