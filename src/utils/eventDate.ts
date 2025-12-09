/**
 * Parse la date et l'heure d'un événement et retourne un objet Date
 *
 * @param date - Date de l'événement (format ISO ou string)
 * @param time - Heure de l'événement (format "HH:mm")
 * @returns Objet Date avec la date et l'heure combinées
 */
export const parseEventDateTime = (date: string, time: string): Date => {
  const [hours, minutes] = time.split(":");
  const eventDate = new Date(date);
  eventDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
  return eventDate;
};

/**
 * Vérifie si un événement est passé
 *
 * @param date - Date de l'événement (format ISO ou string)
 * @param time - Heure de l'événement (format "HH:mm")
 * @param referenceDate - Date de référence pour la comparaison (par défaut: maintenant)
 * @returns true si l'événement est passé, false sinon
 */
export const isEventPast = (
  date: string,
  time: string,
  referenceDate: Date = new Date()
): boolean => {
  const eventDate = parseEventDateTime(date, time);
  return eventDate <= referenceDate;
};

/**
 * Vérifie si un événement est à venir
 *
 * @param date - Date de l'événement (format ISO ou string)
 * @param time - Heure de l'événement (format "HH:mm")
 * @param referenceDate - Date de référence pour la comparaison (par défaut: maintenant)
 * @returns true si l'événement est à venir, false sinon
 */
export const isEventUpcoming = (
  date: string,
  time: string,
  referenceDate: Date = new Date()
): boolean => {
  const eventDate = parseEventDateTime(date, time);
  return eventDate > referenceDate;
};
