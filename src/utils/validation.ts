/**
 * Validation email avec regex RFC 5322 simplifiée
 * Plus robuste que la regex basique /\S+@\S+\.\S+/
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * Valide une adresse email
 *
 * @param email - Adresse email à valider
 * @returns true si l'email est valide, false sinon
 */
export const isValidEmail = (email: string): boolean => {
  if (!email || !email.trim()) {
    return false;
  }
  return EMAIL_REGEX.test(email.trim());
};

/**
 * Valide qu'un champ requis n'est pas vide
 *
 * @param value - Valeur à valider
 * @returns true si la valeur n'est pas vide, false sinon
 */
export const isRequiredFieldFilled = (value: string | undefined | null): boolean => {
  return Boolean(value && value.trim());
};

/**
 * Valide la taille d'un fichier
 *
 * @param file - Fichier à valider
 * @param maxSizeMB - Taille maximale en MB (par défaut: 5MB)
 * @returns true si le fichier est valide, false sinon
 */
export const isValidFileSize = (file: File, maxSizeMB: number = 5): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * Messages d'erreur de validation standards
 */
export const VALIDATION_MESSAGES = {
  REQUIRED: "Ce champ est requis",
  EMAIL_INVALID: "L'email n'est pas valide",
  EMAIL_REQUIRED: "L'email est requis",
  FILE_TOO_LARGE: (maxSize: number) => `Le fichier est trop volumineux (max ${maxSize}MB)`,
  FILE_REQUIRED: "Un fichier est requis",
} as const;
