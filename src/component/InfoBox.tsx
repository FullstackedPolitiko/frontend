import type { Case } from "../model/Case";
import "../style/infobox.css"
import { Space, Typography } from 'antd';

interface props {
    caseItem:Case
}

function BoxAttach() {
    return (
        <div className="box_attach">
            <div className="left_circle"></div>
            <div className="right_circle"></div>
        </div>
    )
}

function InfoBox({caseItem}:props) {
    const { Text, Link } = Typography;

    return (
        <div className="box">
            <BoxAttach></BoxAttach>
            <div className="outer_box">
                <div className="inner_box">
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