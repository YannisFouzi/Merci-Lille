const nodemailer = require("nodemailer");
const validator = require("validator");

// Stockage simple en mémoire pour le rate limiting (en production, utiliser Redis)
const emailAttempts = new Map();

// Fonction de nettoyage périodique des tentatives
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of emailAttempts.entries()) {
    if (now - data.lastAttempt > 60 * 60 * 1000) {
      // Nettoyer après 1h
      emailAttempts.delete(ip);
    }
  }
}, 10 * 60 * 1000); // Nettoyer toutes les 10 minutes

// Rate limiting simple
function checkRateLimit(ip) {
  const now = Date.now();
  const userData = emailAttempts.get(ip) || { count: 0, lastAttempt: 0 };

  // Reset si plus d'1 heure
  if (now - userData.lastAttempt > 60 * 60 * 1000) {
    userData.count = 0;
  }

  userData.count++;
  userData.lastAttempt = now;
  emailAttempts.set(ip, userData);

  // Limite : 5 emails par heure par IP
  return userData.count <= 5;
}

// Fonction de validation et nettoyage des données
function validateAndSanitize(data) {
  const { name, email, subject, message } = data;

  // Validation de base
  if (!name || !email || !subject || !message) {
    throw new Error("Tous les champs sont requis");
  }

  // Validation de l'email
  if (!validator.isEmail(email)) {
    throw new Error("Format d'email invalide");
  }

  // Validation des longueurs
  if (name.length > 100) {
    throw new Error("Le nom est trop long (max 100 caractères)");
  }

  if (subject.length > 200) {
    throw new Error("Le sujet est trop long (max 200 caractères)");
  }

  if (message.length > 2000) {
    throw new Error("Le message est trop long (max 2000 caractères)");
  }

  // Échappement HTML et nettoyage
  const cleanName = validator.escape(name.trim());
  const cleanEmail = validator.normalizeEmail(email.trim());
  const cleanSubject = validator.escape(subject.trim());
  const cleanMessage = validator.escape(message.trim());

  // Vérification anti-spam basique
  const spamKeywords = [
    "viagra",
    "casino",
    "lottery",
    "winner",
    "crypto",
    "bitcoin",
  ];
  const fullText = (cleanName + cleanSubject + cleanMessage).toLowerCase();

  for (const keyword of spamKeywords) {
    if (fullText.includes(keyword)) {
      throw new Error("Message détecté comme spam");
    }
  }

  return {
    name: cleanName,
    email: cleanEmail,
    subject: cleanSubject,
    message: cleanMessage,
  };
}

module.exports = async (req, res) => {
  // Headers de sécurité
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");

  if (req.method === "POST") {
    try {
      // Rate limiting par IP
      const clientIp =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        "unknown";

      if (!checkRateLimit(clientIp)) {
        return res.status(429).json({
          message: "Trop d'emails envoyés. Veuillez réessayer dans une heure.",
        });
      }

      // Validation et nettoyage des données
      const cleanData = validateAndSanitize(req.body);

      // Configuration du transporteur email
      let transporter;
      try {
        transporter = nodemailer.createTransporter({
          host: "ssl0.ovh.net",
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
          logger: false, // Désactiver les logs détaillés en production
          debug: false,
        });

        await transporter.verify();
      } catch (error) {
        console.error("Error creating email transporter");
        return res.status(500).json({
          message: "Erreur de configuration email",
        });
      }

      // Envoi de l'email avec contenu nettoyé
      try {
        const info = await transporter.sendMail({
          from: process.env.EMAIL_USER, // Utiliser l'email configuré comme expéditeur
          replyTo: cleanData.email, // Email de l'utilisateur en reply-to
          to: process.env.EMAIL_USER,
          subject: `[Contact Site] ${cleanData.subject}`,
          text: `De: ${cleanData.name} (${cleanData.email})\n\nMessage: ${cleanData.message}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">Nouveau message depuis le site</h2>
              <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
                <p><strong>De:</strong> ${cleanData.name}</p>
                <p><strong>Email:</strong> ${cleanData.email}</p>
                <p><strong>Sujet:</strong> ${cleanData.subject}</p>
                <div style="margin-top: 20px;">
                  <strong>Message:</strong>
                  <div style="background: white; padding: 15px; border-radius: 3px; margin-top: 10px;">
                    ${cleanData.message.replace(/\n/g, "<br>")}
                  </div>
                </div>
              </div>
            </div>
          `,
        });

        res.status(200).json({
          message: "Email envoyé avec succès",
        });
      } catch (error) {
        console.error("Error sending email");
        res.status(500).json({
          message: "Erreur lors de l'envoi de l'email",
        });
      }
    } catch (error) {
      // Erreurs de validation
      return res.status(400).json({
        message: error.message || "Données invalides",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Méthode ${req.method} non autorisée` });
  }
};
