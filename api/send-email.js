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
      const transporter = nodemailer.createTransport({
        host: "ssl0.ovh.net",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        logger: true, // Activer les logs détaillés temporairement pour diagnostic
        debug: true,
      });
      console.log("✅ Transporteur email configuré");

      // Test de connexion SMTP
      console.log("🔗 Test de connexion SMTP...");
      try {
        await transporter.verify();
        console.log("✅ Connexion SMTP validée avec succès");
      } catch (verifyError) {
        console.error("❌ Erreur de connexion SMTP:");
        console.error("📄 Message:", verifyError.message);
        console.error("📊 Code:", verifyError.code);
        return res.status(500).json({
          message: "Erreur de configuration email",
        });
      }

      // Envoi de l'email avec contenu nettoyé
      console.log("📤 Tentative d'envoi de l'email...");
      try {
        const mailOptions = {
          from: `"MerciLille Contact" <${process.env.EMAIL_USER}>`, // Nom d'affichage + email
          replyTo: `"${cleanData.name}" <${cleanData.email}>`, // Nom + email en reply-to
          to: process.env.EMAIL_USER,
          subject: `[MerciLille] ${cleanData.subject}`,
          // Headers additionnels pour améliorer la délivrabilité
          headers: {
            "X-Mailer": "MerciLille Contact Form",
            "X-Priority": "3",
            "X-MSMail-Priority": "Normal",
            "Message-ID": `<${Date.now()}.${Math.random()
              .toString(36)
              .substr(2, 9)}@mercilille.com>`,
          },
          text: `De: ${cleanData.name} (${cleanData.email})\n\nMessage: ${cleanData.message}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Contact depuis MerciLille</title>
            </head>
            <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                      <tr style="background-color: #333;">
                        <td style="padding: 20px; text-align: center;">
                          <h1 style="color: white; margin: 0; font-family: Arial, sans-serif;">MerciLille</h1>
                          <p style="color: #ccc; margin: 5px 0 0 0; font-family: Arial, sans-serif;">Nouveau message de contact</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 30px; font-family: Arial, sans-serif;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                                <strong style="color: #333;">Nom:</strong><br>
                                <span style="color: #666;">${
                                  cleanData.name
                                }</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                                <strong style="color: #333;">Email:</strong><br>
                                <a href="mailto:${
                                  cleanData.email
                                }" style="color: #0066cc; text-decoration: none;">${
            cleanData.email
          }</a>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                                <strong style="color: #333;">Sujet:</strong><br>
                                <span style="color: #666;">${
                                  cleanData.subject
                                }</span>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 20px 0;">
                                <strong style="color: #333;">Message:</strong><br>
                                <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px; line-height: 1.6; color: #444;">
                                  ${cleanData.message.replace(/\n/g, "<br>")}
                                </div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr style="background-color: #f8f8f8;">
                        <td style="padding: 15px; text-align: center; font-family: Arial, sans-serif; font-size: 12px; color: #888;">
                          Ce message a été envoyé depuis le formulaire de contact de mercilille.com
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
            </html>
          `,
        };

        console.log(`📧 Envoi vers: ${process.env.EMAIL_USER}`);
        console.log(`📋 Sujet: [Contact Site] ${cleanData.subject}`);

        const info = await transporter.sendMail(mailOptions);

        console.log("✅ Email envoyé avec succès!");
        console.log(`📨 Message ID: ${info.messageId || "N/A"}`);
        console.log(`📬 Response: ${info.response || "N/A"}`);
        console.log(`📊 Accepted: ${JSON.stringify(info.accepted || [])}`);
        console.log(`❌ Rejected: ${JSON.stringify(info.rejected || [])}`);
        console.log(`⚠️  Pending: ${JSON.stringify(info.pending || [])}`);
        console.log(`🏠 Envelope: ${JSON.stringify(info.envelope || {})}`);

        res.status(200).json({
          message: "Email envoyé avec succès",
          details: {
            messageId: info.messageId,
            accepted: info.accepted,
            rejected: info.rejected,
            response: info.response,
          },
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
