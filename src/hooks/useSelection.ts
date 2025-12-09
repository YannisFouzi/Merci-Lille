import { useState } from "react";

export const useSelection = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleSelection = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAll = (ids: string[]) => {
    setSelectedIds(new Set(ids));
  };

  const deselectAll = () => {
    setSelectedIds(new Set());
  };

  return {
    selectedIds,
    setSelectedIds,
    toggleSelection,
    selectAll,
    deselectAll,
  };
};

export type UseSelectionReturn = ReturnType<typeof useSelection>;
