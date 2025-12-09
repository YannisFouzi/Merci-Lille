import React from "react";
import { GalleryImage } from "../../hooks/useAdminGallery";

type GalleryGridItemProps = {
  image: GalleryImage;
  index: number;
  isSelected: boolean;
  draggedImageId: string | null;
  dragOverIndex: number | null;
  onToggleSelect: (id: string) => void;
  onDragStart: (e: React.DragEvent, imageId: string) => void;
  onDragOver: (e: React.DragEvent, index: number) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, index: number) => void;
};

const GalleryGridItem: React.FC<GalleryGridItemProps> = ({
  image,
  index,
  isSelected,
  draggedImageId,
  dragOverIndex,
  onToggleSelect,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  return (
    <div
      key={image._id}
      draggable
      onDragStart={(e) => onDragStart(e, image._id)}
      onDragOver={(e) => onDragOver(e, index)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, index)}
      className={`relative group bg-gray-800 rounded-lg overflow-hidden cursor-move transition-all duration-200 ${
        isSelected ? "ring-2 ring-red-500" : ""
      } ${draggedImageId === image._id ? "opacity-50 scale-95" : ""} ${
        dragOverIndex === index ? "ring-2 ring-blue-400 scale-105" : ""
      }`}
      onClick={() => onToggleSelect(image._id)}
    >
      <img
        src={image.imageSrc}
        alt="Gallery"
        className="w-full h-48 object-cover pointer-events-none"
      />
      <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
        {index + 1}
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect(image._id);
          }}
          className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-opacity duration-300 pointer-events-auto"
        >
          {isSelected ? "Désélectionner" : "Sélectionner"}
        </button>
      </div>
    </div>
  );
};

export default GalleryGridItem;
