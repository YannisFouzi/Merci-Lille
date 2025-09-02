import { useQuery } from "@tanstack/react-query";
import { galleryService } from "../services/gallery.service";

export interface GalleryImage {
  _id: string;
  imageSrc: string;
}

/**
 * Hook personnalisé pour récupérer les images de la galerie
 * Implémente la stratégie cache-first avec background refresh
 */
export const useGallery = () => {
  const {
    data: images,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["gallery"],
    queryFn: galleryService.getAllImages,
    // Configuration spécifique pour la galerie (hérite de la config globale)
    staleTime: 30 * 60 * 1000, // 30 minutes pour les images (moins dynamique que les events)
  });

  return {
    images: images || [],
    isLoading,
    error: isError ? "Erreur lors du chargement des images" : null,
  };
};
