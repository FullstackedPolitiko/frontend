import { useState } from "react";

interface props {
    items: number[]
    itemsToShow: number
}

function usePagination({ items, itemsToShow }: props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const visibleYears = items.slice(currentIndex, currentIndex + itemsToShow);

    const morePagesFront = currentIndex < items.length-itemsToShow

    const morePagesBack = currentIndex > 0

    const back = () => {
        if (morePagesBack) {
            setCurrentIndex(currentIndex - itemsToShow)
        }
    }

    const next = () => {
        if (morePagesFront) {
            setCurrentIndex(currentIndex + itemsToShow)
        }
    }

    return {
        visibleYears,
        next,
        back,
        morePagesFront,
        morePagesBack
    }
}

export default usePagination