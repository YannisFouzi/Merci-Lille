/**
 * Parse les genres d'un événement
 * Gère le cas où les genres sont stockés en JSON string ou déjà en array
 *
 * @param genres - Genres de l'événement (array ou JSON string)
 * @returns Array de genres
 */
export const parseEventGenres = (genres: string[] | string): string[] => {
  if (Array.isArray(genres)) {
    return genres;
  }

  if (typeof genres === "string") {
    try {
      const parsed = JSON.parse(genres);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      // Si le parsing échoue, retourner un array vide
      return [];
    }
  }

  return [];
};

/**
 * Formate un nom de fichier depuis une URL Cloudinary
 * Extrait le nom du fichier de l'URL complète
 *
 * @param url - URL complète du fichier
 * @returns Nom du fichier
 */
export const extractFileNameFromUrl = (url: string): string => {
  const parts = url.split("/");
  return parts[parts.length - 1];
};
