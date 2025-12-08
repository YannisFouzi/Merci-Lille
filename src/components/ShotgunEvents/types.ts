export interface EventCardProps {
  _id?: string;
  imageSrc: string;
  title: string;
  eventNumber: string;
  order?: number;
  city: string;
  country?: string;
  date: string;
  time: string;
  genres: string[];
  ticketLink: string;
  isPast?: boolean;
  imagePublicId?: string;
  isHidden?: boolean;
  isFeatured?: boolean;
}
