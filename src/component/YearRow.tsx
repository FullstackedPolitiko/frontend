import type { Case } from "../model/Case";
import InfoBox from "./InfoBox";

interface Props {
  year: string;
  cases: Case[];
}

function YearRow({ year, cases }: Props) {
  return (
    <div className="yearrow">
      <div className="yearinput-box">
        <h2 className="yearinput-text">{year}</h2>
      </div>
      <div className="box-rows">
        {cases.map((c, index) => (
          <InfoBox key={index} caseItem={c} />
        ))}
      </div>
    </div>
  );
}

export default YearRow;