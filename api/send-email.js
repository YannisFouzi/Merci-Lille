const nodemailer = require("nodemailer");
const validator = require("validator");

// Stockage simple en mémoire pour le rate limiting (en production, utiliser Redis)
const emailAttempts = new Map();

console.log("🔧 API Email - Module chargé avec succès");

// Fonction de nettoyage périodique des tentatives
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of emailAttempts.entries()) {
    if (now - data.lastAttempt > 60 * 60 * 1000) {
      // Nettoyer après 1h
      emailAttempts.delete(ip);
    }
  }
}, 10 * 60 * 1000);

// Rate limiting simple
function checkRateLimit(ip) {
  console.log(`🕰️ Vérification rate limit pour IP: ${ip}`);
  const now = Date.now();
  const userData = emailAttempts.get(ip) || { count: 0, lastAttempt: 0 };

  // Reset si plus d'1 heure
  if (now - userData.lastAttempt > 60 * 60 * 1000) {
    userData.count = 0;
    console.log(`🔄 Reset du compteur pour IP: ${ip}`);
  }

  userData.count++;
  userData.lastAttempt = now;
  emailAttempts.set(ip, userData);

  // Limite : 5 emails par heure par IP
  const allowed = userData.count <= 5;
  console.log(
    `📊 Rate limit - IP: ${ip}, Count: ${userData.count}/5, Allowed: ${allowed}`
  );
  return allowed;
}

// Fonction de validation et nettoyage des données
function validateAndSanitize(data) {
  console.log("🔍 Début de la validation des données");
  const { name, email, subject, message } = data;

  // Validation de base
  if (!name || !email || !subject || !message) {
    console.log("❌ Validation échouée: champs manquants");
    throw new Error("Tous les champs sont requis");
  }

  // Validation de l'email
  if (!validator.isEmail(email)) {
    console.log(`❌ Email invalide: ${email}`);
    throw new Error("Format d'email invalide");
  }

  // Validation des longueurs
  if (name.length > 100) {
    console.log(`❌ Nom trop long: ${name.length} caractères`);
    throw new Error("Le nom est trop long (max 100 caractères)");
  }

  if (subject.length > 200) {
    console.log(`❌ Sujet trop long: ${subject.length} caractères`);
    throw new Error("Le sujet est trop long (max 200 caractères)");
  }

  if (message.length > 2000) {
    console.log(`❌ Message trop long: ${message.length} caractères`);
    throw new Error("Le message est trop long (max 2000 caractères)");
  }

  console.log("🧹 Nettoyage et échappement des données");
  // Échappement HTML et nettoyage
  const cleanName = validator.escape(name.trim());
  const cleanEmail = validator.normalizeEmail(email.trim());
  const cleanSubject = validator.escape(subject.trim());
  const cleanMessage = validator.escape(message.trim());

  // Vérification anti-spam basique
  console.log("🛡️ Vérification anti-spam");
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
      console.log(`❌ Spam détecté avec le mot-clé: ${keyword}`);
      throw new Error("Message détecté comme spam");
    }
  }

  console.log("✅ Validation réussie");
  return {
    name: cleanName,
    email: cleanEmail,
    subject: cleanSubject,
    message: cleanMessage,
  };
}

module.exports = async (req, res) => {
  console.log(`📧 API Email - Nouvelle requête: ${req.method} ${req.url}`);

  // Headers de sécurité
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");

  if (req.method === "POST") {
    try {
      console.log("📥 Traitement d'une requête POST");

      // Rate limiting par IP
      const clientIp =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        "unknown";

      console.log(`🌐 IP client détectée: ${clientIp}`);

      if (!checkRateLimit(clientIp)) {
        console.log("🚫 Rate limit dépassé");
        return res.status(429).json({
          message: "Trop d'emails envoyés. Veuillez réessayer dans une heure.",
        });
      }

      console.log("📝 Validation et nettoyage des données en cours...");
      // Validation et nettoyage des données
      const cleanData = validateAndSanitize(req.body);
      console.log("✅ Données validées et nettoyées avec succès");

      // Vérification des variables d'environnement
      console.log("🔑 Vérification des variables d'environnement...");
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.error("❌ Variables d'environnement EMAIL manquantes");
        console.log(`EMAIL_USER présent: ${!!process.env.EMAIL_USER}`);
        console.log(`EMAIL_PASS présent: ${!!process.env.EMAIL_PASS}`);
        return res.status(500).json({
          message: "Configuration email manquante",
        });
      }
      console.log("✅ Variables d'environnement OK");

      // Configuration du transporteur email
      console.log("📮 Configuration du transporteur email...");
      const transporter = nodemailer.createTransporter({
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
      console.log(
        "✅ Transporteur email configuré (pas de vérification préalable)"
      );

      // Envoi de l'email avec contenu nettoyé
      console.log("📤 Tentative d'envoi de l'email...");
      try {
        const mailOptions = {
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
        };

        console.log(`📧 Envoi vers: ${process.env.EMAIL_USER}`);
        console.log(`📋 Sujet: [Contact Site] ${cleanData.subject}`);

        const info = await transporter.sendMail(mailOptions);

        console.log("✅ Email envoyé avec succès!");
        console.log(`📨 Message ID: ${info.messageId || "N/A"}`);

        res.status(200).json({
          message: "Email envoyé avec succès",
        });
      } catch (error) {
        console.error("❌ Erreur lors de l'envoi de l'email:");
        console.error("📄 Message:", error.message);
        console.error("📊 Code:", error.code);
        console.error("📋 Response:", error.response);
        res.status(500).json({
          message: "Erreur lors de l'envoi de l'email",
        });
      }
    } catch (error) {
      console.error("❌ Erreur générale dans l'API:");
      console.error("📄 Message:", error.message);
      console.error("📊 Stack:", error.stack);
      // Erreurs de validation
      return res.status(400).json({
        message: error.message || "Données invalides",
      });
    }
  } else {
    console.log(`❌ Méthode non autorisée: ${req.method}`);
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Méthode ${req.method} non autorisée` });
  }
};
