/**
 * Barrel export pour tous les schémas de validation
 * Permet d'importer depuis un seul fichier : import { contactFormSchema } from '@/schemas'
 */

export { contactFormSchema, type ContactFormData } from "./contactForm";
export { eventFormSchema, type EventFormData, validateEventImage } from "./eventForm";
