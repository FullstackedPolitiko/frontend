import { useState } from "react";

interface props {
    years: number[]
    itemsToShow: number
}

function usePagination({ years, itemsToShow }: props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleYears = years.slice(currentIndex, currentIndex + itemsToShow);

    const morePagesFront = currentIndex < years.length-itemsToShow
    console.log("years size:" , years.length)
    console.log("current index:",currentIndex)

    const morePagesBack = currentIndex > 0

    const goBack = () => {
        if (morePagesBack) {
            setCurrentIndex(currentIndex - itemsToShow)
        }
    }

    const goForward = () => {
        if (morePagesFront) {
            setCurrentIndex(currentIndex + itemsToShow)
        }
    }

    return {
        visibleYears,
        goForward,
        goBack,
        morePagesFront,
        morePagesBack
    }
}

export default usePagination