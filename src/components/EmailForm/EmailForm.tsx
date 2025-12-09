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

    if (validateForm()) {
      try {
        const requestConfig = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest", // Header CSRF requis
          },
          body: JSON.stringify(formData),
        };

        const response = await fetch("/api/send-email", requestConfig);

        if (response.ok) {
          setConfirmationMessage("Email envoyé avec succès !");
          // Réinitialiser le formulaire
          setFormData({ name: "", email: "", subject: "", message: "" });
          // Effacer le message de confirmation après 5 secondes
          setTimeout(() => setConfirmationMessage(""), 5000);
        } else {
          let errorData;
          try {
            errorData = await response.json();
          } catch {
            // Impossible de parser la réponse JSON
          }

          if (response.status === 429) {
            setConfirmationMessage(
              "Trop d'emails envoyés. Veuillez réessayer dans une heure."
            );
          } else if (response.status >= 500) {
            setConfirmationMessage(
              "Erreur serveur. Veuillez réessayer plus tard."
            );
          } else if (errorData?.message) {
            setConfirmationMessage(errorData.message);
          } else {
            setConfirmationMessage(
              "Échec de l'envoi de l'email. Veuillez réessayer."
            );
          }
        }
      } catch (error: unknown) {
        setConfirmationMessage("Une erreur est survenue. Veuillez réessayer plus tard.");
      }
    }
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
