import { z } from "zod";

/**
 * Schéma de validation pour le formulaire de contact
 * Utilise Zod pour une validation type-safe côté client
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Le nom est requis")
    .max(100, "Le nom ne peut pas dépasser 100 caractères")
    .trim(),

  email: z
    .string()
    .min(1, "L'email est requis")
    .email("L'email n'est pas valide")
    .max(255, "L'email ne peut pas dépasser 255 caractères")
    .trim()
    .toLowerCase(),

  subject: z
    .string()
    .min(1, "L'objet est requis")
    .max(200, "L'objet ne peut pas dépasser 200 caractères")
    .trim(),

  message: z
    .string()
    .min(1, "Le message est requis")
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(2000, "Le message ne peut pas dépasser 2000 caractères")
    .trim(),
});

/**
 * Type inféré automatiquement depuis le schéma Zod
 * Plus besoin de définir manuellement les types !
 */
export type ContactFormData = z.infer<typeof contactFormSchema>;
