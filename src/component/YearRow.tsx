import type { Case } from "../model/Case";
import InfoBox from "./InfoBox";

interface Props {
    year: string;
    cases: Case[];
    onCaseSelected: (caseId: string | number) => void;
}

function YearRow({ year, cases, onCaseSelected }: Props) {
    return (
        <div className="yearrow">
            <div className="yearinput-box">
                <h2 className="yearinput-text">{year}</h2>
            </div>
            <div className="box-rows">
                {cases.map((c, index) => (
                    <InfoBox key={index} caseItem={c} onCaseSelected={onCaseSelected} />
                ))}
            </div>
        </div>
    );
}

export default YearRow;