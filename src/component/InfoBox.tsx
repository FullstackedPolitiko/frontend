import "../style/infobox.css"


interface props {
    casename: string,
    link: string,
    votes: string,
    attendance: string
}

function InfoBox({ casename, link, votes, attendance }: props) {

    return (
        <div className="outer_box">
            <div className="inner_box">
            
            </div>
        </div>
    )
}

export default InfoBox;