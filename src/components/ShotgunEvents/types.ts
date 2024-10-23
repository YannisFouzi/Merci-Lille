export interface EventCardProps {
  imageSrc: string;
  title: string;
  eventNumber: string;
  city: string;
  country?: string;
  date: string;
  time: string;
  isFree?: boolean;
  genres: string[];
  ticketLink: string;
  isPast?: boolean;
}
