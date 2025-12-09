import { useState } from "react";

export const useDragAndDropList = <T,>(
  items: T[],
  setItems: (items: T[]) => void,
  getId: (item: T) => string
) => {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [hasOrderChanged, setHasOrderChanged] = useState(false);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);

    if (!draggedId) return;

    const draggedIndex = items.findIndex((item) => getId(item) === draggedId);
    if (draggedIndex === -1 || draggedIndex === dropIndex) {
      setDraggedId(null);
      return;
    }

    const newItems = [...items];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);

    setItems(newItems);
    setDraggedId(null);
    setHasOrderChanged(true);
  };

  const resetOrderChanged = () => setHasOrderChanged(false);

  return {
    draggedId,
    dragOverIndex,
    hasOrderChanged,
    setHasOrderChanged,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    resetOrderChanged,
  };
};

export type UseDragAndDropListReturn = ReturnType<typeof useDragAndDropList>;
