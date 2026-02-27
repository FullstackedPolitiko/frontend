import type { Case } from "../model/Case";
import "../style/infobox.css"
import { Space, Typography } from 'antd';

{/* ---------------------------------------------------------------------
    Component: InfoBox
    Purpose: Takes info about a case and displays it
    --------------------------------------------------------------------- */}

interface props {
    caseItem:Case
}

function BoxAttach() {
    return (
        <div className="box-attach">
            <div className="left-circle"></div>
            <div className="right-circle"></div>
        </div>
    )
}

function InfoBox({caseItem}:props) {
    const { Text, Link } = Typography;

    return (
        <div className="box">
            <BoxAttach></BoxAttach>
            <div className="outer-box">
                <div className="inner-box">
                    <Space vertical>
                        <Text type="success">{caseItem.casename}</Text>
                        <Text type="success">{caseItem.votes}</Text>
                        <Text type="success">{caseItem.attendance}</Text>
                        <Link href={caseItem.link}>reference</Link>
                    </Space>
                </div>
            </div>
        </div>
    )
}

export default InfoBox;