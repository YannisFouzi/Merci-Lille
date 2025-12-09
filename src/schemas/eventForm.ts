import { z } from "zod";

/**
 * Schéma de validation pour le formulaire d'événement (Admin)
 * Utilise Zod pour une validation type-safe côté client
 */
export const eventFormSchema = z.object({
  title: z
    .string()
    .min(1, "Le titre est requis")
    .max(200, "Le titre ne peut pas dépasser 200 caractères")
    .trim(),

  city: z
    .string()
    .min(1, "La ville est requise")
    .max(100, "La ville ne peut pas dépasser 100 caractères")
    .trim(),

  date: z
    .string()
    .min(1, "La date est requise")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide (YYYY-MM-DD)"),

  time: z
    .string()
    .min(1, "L'heure est requise")
    .regex(/^\d{2}:\d{2}$/, "Format d'heure invalide (HH:mm)"),

  ticketLink: z
    .string()
    .min(1, "Le lien de billetterie est requis")
    .url("Le lien doit être une URL valide")
    .max(500, "Le lien ne peut pas dépasser 500 caractères")
    .trim(),

  genres: z
    .array(z.string()),

  isFeatured: z
    .boolean(),

  // Image est optionnelle car elle peut déjà exister lors de l'édition
  imageSrc: z
    .string()
    .optional(),

  country: z
    .string()
    .optional(),

  order: z
    .number()
    .optional(),
});

/**
 * Type inféré automatiquement depuis le schéma Zod
 */
export type EventFormData = z.infer<typeof eventFormSchema>;

/**
 * Schéma pour la validation de l'image séparément
 * (car File n'est pas sérialisable en JSON)
 */
export const validateEventImage = (file: File | null, isEditing: boolean): { valid: boolean; error?: string } => {
  // Si on édite et qu'il n'y a pas de nouveau fichier, c'est OK
  if (isEditing && !file) {
    return { valid: true };
  }

  // Si on crée un nouvel événement, le fichier est obligatoire
  if (!isEditing && !file) {
    return { valid: false, error: "Une image est requise" };
  }

  // Vérifier la taille (5MB max)
  if (file && file.size > 5 * 1024 * 1024) {
    return { valid: false, error: "L'image est trop volumineuse (max 5MB)" };
  }

  // Vérifier le type MIME
  if (file && !file.type.startsWith("image/")) {
    return { valid: false, error: "Le fichier doit être une image" };
  }

  return { valid: true };
};
