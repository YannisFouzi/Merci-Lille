import { EventCardProps } from "../components/ShotgunEvents/types";

/**
 * Sort events by manual order first, otherwise by event date.
 * When `order` is set on both events and non-zero, lower order comes first.
 * Otherwise we fall back to date sorting, newest first by default.
 */
export const sortEventsByOrderOrDate = (
  events: EventCardProps[],
  ascending: boolean = false
): EventCardProps[] => {
  return [...events].sort((a, b) => {
    if (
      a.order !== undefined &&
      b.order !== undefined &&
      a.order !== 0 &&
      b.order !== 0
    ) {
      return a.order - b.order;
    }

    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return ascending ? dateA - dateB : dateB - dateA;
  });
};

/**
 * Admin should reflect the same visual ordering as the public site.
 */
export const sortEventsForAdmin = (events: EventCardProps[]): EventCardProps[] =>
  sortEventsByOrderOrDate(events);
