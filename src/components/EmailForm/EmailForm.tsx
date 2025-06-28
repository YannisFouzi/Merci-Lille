import { faMessage } from "@fortawesome/free-regular-svg-icons";
import {
  faAt,
  faCheckCircle,
  faEnvelope,
  faFont,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./EmailForm.scss";

const EmailForm: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", subject: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide";
      isValid = false;
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "L'objet est requis";
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Effacer l'erreur lorsque l'utilisateur commence à taper
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 DÉBUT ENVOI EMAIL - Form submitted");

    if (validateForm()) {
      console.log("✅ Validation du formulaire réussie");
      console.log("📝 Données à envoyer:", formData);

      try {
        // Construire l'URL complète
        const baseUrl = window.location.origin;
        const apiUrl = `${baseUrl}/api/send-email`;
        console.log("🌐 URL API complète:", apiUrl);
        console.log("🏠 Origin actuel:", window.location.origin);
        console.log("📍 Pathname actuel:", window.location.pathname);

        const requestConfig = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest", // Header CSRF requis
          },
          body: JSON.stringify(formData),
        };

        console.log("📤 Configuration de la requête:", requestConfig);
        console.log("📦 Body JSON:", JSON.stringify(formData, null, 2));

        console.log("⏳ Envoi de la requête fetch...");
        const response = await fetch("/api/send-email", requestConfig);

        console.log("📬 Réponse reçue:");
        console.log("  - Status:", response.status);
        console.log("  - StatusText:", response.statusText);
        console.log("  - OK:", response.ok);
        console.log(
          "  - Headers:",
          Object.fromEntries(response.headers.entries())
        );

        if (response.ok) {
          console.log("🎉 Succès! Email envoyé");
          const successData = await response.json();
          console.log("📨 Données de succès:", successData);

          setConfirmationMessage("Email envoyé avec succès !");
          // Réinitialiser le formulaire
          setFormData({ name: "", email: "", subject: "", message: "" });
          // Effacer le message de confirmation après 5 secondes
          setTimeout(() => setConfirmationMessage(""), 5000);
        } else {
          console.log("❌ Erreur dans la réponse - Status:", response.status);

          let errorData;
          try {
            errorData = await response.json();
            console.log("📄 Données d'erreur reçues:", errorData);
          } catch (jsonError) {
            console.log("⚠️ Impossible de parser la réponse JSON:", jsonError);
            console.log("📄 Réponse brute:", await response.text());
          }

          if (response.status === 429) {
            console.log("🚫 Rate limit atteint");
            setConfirmationMessage(
              "Trop d'emails envoyés. Veuillez réessayer dans une heure."
            );
          } else if (response.status >= 500) {
            console.log("🔥 Erreur serveur 5xx");
            setConfirmationMessage(
              "Erreur serveur. Veuillez réessayer plus tard."
            );
          } else if (errorData?.message) {
            console.log("💬 Message d'erreur spécifique:", errorData.message);
            setConfirmationMessage(errorData.message);
          } else {
            console.log("❓ Erreur non spécifiée");
            setConfirmationMessage(
              "Échec de l'envoi de l'email. Veuillez réessayer."
            );
          }
        }
      } catch (error: any) {
        console.log("💥 ERREUR CATCH - Exception attrapée:");
        console.error("📊 Type d'erreur:", error.constructor.name);
        console.error("📄 Message:", error.message);
        console.error("📋 Stack:", error.stack);
        console.error("🔍 Erreur complète:", error);

        // Vérifier le type d'erreur
        if (error.name === "TypeError" && error.message.includes("fetch")) {
          console.log("🌐 Erreur de réseau ou CORS détectée");
        } else if (error.name === "AbortError") {
          console.log("⏰ Requête interrompue/timeout");
        }

        setConfirmationMessage(
          "Une erreur est survenue. Veuillez réessayer plus tard."
        );
      }
    } else {
      console.log("❌ Validation du formulaire échouée");
      console.log("🔍 Erreurs:", errors);
    }

    console.log("🏁 FIN ENVOI EMAIL");
  };

  return (
    <div
      id="contact-section"
      className="card-3d-wrap mx-auto"
      style={{ width: "600px", height: "600px" }}
    >
      <div className={`card-3d-wrapper ${isFlipped ? "is-flipped" : ""}`}>
        <div className="card-front">
          <div className="center-wrap">
            <div className="section text-center">
              <h4 className="mb-4 pb-3">Bookings & Infos</h4>
              {confirmationMessage && (
                <div className="confirmation-message">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="confirmation-icon"
                  />
                  {confirmationMessage}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <div className="input-wrapper">
                    <FontAwesomeIcon
                      icon={faFont}
                      className="input-icon"
                      size="xl"
                    />
                    <input
                      type="text"
                      name="name"
                      className="form-style"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.name && (
                    <div className="error-message">{errors.name}</div>
                  )}
                </div>
                <div className="form-group mb-2">
                  <div className="input-wrapper">
                    <FontAwesomeIcon
                      icon={faAt}
                      className="input-icon"
                      size="xl"
                    />
                    <input
                      type="email"
                      name="email"
                      className="form-style"
                      placeholder="Votre email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>
                <div className="form-group mb-2">
                  <div className="input-wrapper">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="input-icon"
                      size="xl"
                    />
                    <input
                      type="text"
                      name="subject"
                      className="form-style"
                      placeholder="Objet"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  {errors.subject && (
                    <div className="error-message">{errors.subject}</div>
                  )}
                </div>
                <div className="form-group mb-2">
                  <div className="input-wrapper">
                    <FontAwesomeIcon
                      icon={faMessage}
                      className="input-icon message-icon"
                      size="xl"
                    />
                    <textarea
                      name="message"
                      className="form-style"
                      placeholder="Votre message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  {errors.message && (
                    <div className="error-message">{errors.message}</div>
                  )}
                </div>
                <button type="submit" className="btn mt-4">
                  Envoyer
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="card-back">
          <div className="center-wrap">
            <div className="section text-center">
              <h4 className="mb-4 pb-3">E-mail envoyé avec succès!</h4>
              <button onClick={() => setIsFlipped(false)} className="btn mt-4">
                Envoyer un autre e-mail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
