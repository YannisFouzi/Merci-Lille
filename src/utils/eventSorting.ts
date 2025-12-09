import { EventCardProps } from "../components/ShotgunEvents/types";

/**
 * Trie les événements par ordre ou par date
 * Si order est défini et non-zéro, trie par order (croissant)
 * Sinon, trie par date (décroissant - plus récent d'abord)
 *
 * @param events - Liste des événements à trier
 * @param ascending - Si true, tri par date croissant (ancien → récent), sinon décroissant (récent → ancien). Par défaut: false
 * @returns Liste des événements triés
 */
export const sortEventsByOrderOrDate = (
  events: EventCardProps[],
  ascending: boolean = false
): EventCardProps[] => {
  return [...events].sort((a, b) => {
    // Si les deux ont un order défini et non-zéro, utiliser order
    if (
      a.order !== undefined &&
      b.order !== undefined &&
      a.order !== 0 &&
      b.order !== 0
    ) {
      return a.order - b.order;
    }

    // Sinon, trier par date
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    // Par défaut: décroissant (plus récent d'abord)
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

/**
 * Version spécifique pour l'admin qui inverse l'ordre par défaut
 * (utilisé dans useAdminEvents où b.order - a.order était utilisé)
 *
 * @param events - Liste des événements à trier
 * @returns Liste des événements triés
 */
export const sortEventsForAdmin = (events: EventCardProps[]): EventCardProps[] => {
  return [...events].sort((a, b) => {
    if (
      a.order !== undefined &&
      b.order !== undefined &&
      a.order !== 0 &&
      b.order !== 0
    ) {
      return b.order - a.order; // Ordre inversé pour l'admin
    }
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
};
