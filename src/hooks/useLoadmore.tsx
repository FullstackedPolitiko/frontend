import { useState } from "react";
import type { Case } from "../model/Case";

interface RowPaginationProps {
  cases: Case[];
  initialCount: number;
}

export function useLoadmore({ cases, initialCount }: RowPaginationProps) {
  const [elementsToShow, setElementsToShow] = useState(initialCount);

  const visibleCases = cases.slice(0, elementsToShow);

  const handleLoadMore = () => {
    setElementsToShow((prev) => prev + initialCount);
  };

  return {
    visibleCases,
    setElementsToShow,
    handleLoadMore,
    hasMore: elementsToShow < cases.length
  };
}