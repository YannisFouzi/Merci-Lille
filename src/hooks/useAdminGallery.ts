import { useCallback, useEffect, useState } from "react";
import { galleryService } from "../services/gallery.service";

export interface GalleryImage {
  _id: string;
  imageSrc: string;
  createdAt: string;
}

export const useAdminGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      const data = await galleryService.getAllImages();
      setImages(data);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des images");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const uploadImages = useCallback(
    async (formData: FormData) => {
      await galleryService.uploadImages(formData);
      await fetchImages();
    },
    [fetchImages]
  );

  const deleteMany = useCallback(
    async (ids: string[]) => {
      await galleryService.deleteImages(ids);
      await fetchImages();
    },
    [fetchImages]
  );

  const deleteOne = useCallback(
    async (id: string) => {
      await galleryService.deleteImage(id);
      await fetchImages();
    },
    [fetchImages]
  );

  const updateOrder = useCallback(
    async (orderedIds: string[]) => {
      await galleryService.updateImageOrder(orderedIds);
      await fetchImages();
    },
    [fetchImages]
  );

  return {
    images,
    setImages,
    loading,
    error,
    setError,
    refetch: fetchImages,
    uploadImages,
    deleteMany,
    deleteOne,
    updateOrder,
  };
};

export type UseAdminGalleryReturn = ReturnType<typeof useAdminGallery>;
