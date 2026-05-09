import type { Case } from "../model/Case";
import "../style/infobox.css"
import { Space, Typography } from 'antd';

interface props {
    caseItem: Case;
    onCaseSelected: (caseId: string | number) => void;
}

function BoxAttach() {
    return (
        <div className="box-attach">
            <div className="left-circle"></div>
            <div className="right-circle"></div>
        </div>
    )
}

function InfoBox({ caseItem, onCaseSelected }: props) {
    const { Text, Link } = Typography;

    const handleReferenceClick = () => {
        if (caseItem.id !== undefined) {
            onCaseSelected(caseItem.id);
        }
    };

    return (
        <div className="box">
            <BoxAttach />
            <div className="outer-box">
                <div className="inner-box">
                    <Space direction="vertical">
                        <Text type="success">{caseItem.casename}</Text>
                        <Text type="success">{caseItem.votes}</Text>
                        <Text type="success">{caseItem.attendance}</Text>
                        <Link onClick={handleReferenceClick} style={{ cursor: 'pointer' }}>reference</Link>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default InfoBox;