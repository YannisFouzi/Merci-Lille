import { faMessage } from "@fortawesome/free-regular-svg-icons";
import {
  faAt,
  faCheckCircle,
  faEnvelope,
  faFont,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { contactFormSchema, type ContactFormData } from "../../schemas";
import "./EmailForm.scss";

const EmailForm: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur", // Valider au blur pour une meilleure UX
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const requestConfig = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest", // Header CSRF requis
        },
        body: JSON.stringify(data),
      };

      const response = await fetch("/api/send-email", requestConfig);

      if (response.ok) {
        setConfirmationMessage("Email envoyé avec succès !");
        // Réinitialiser le formulaire
        reset();
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-2">
                  <div className="input-wrapper">
                    <FontAwesomeIcon
                      icon={faFont}
                      className="input-icon"
                      size="xl"
                    />
                    <input
                      type="text"
                      className="form-style"
                      placeholder="Votre nom"
                      {...register("name")}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.name && (
                    <div className="error-message">{errors.name.message}</div>
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
                      className="form-style"
                      placeholder="Votre email"
                      {...register("email")}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.email && (
                    <div className="error-message">{errors.email.message}</div>
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
                      className="form-style"
                      placeholder="Objet"
                      {...register("subject")}
                      disabled={isSubmitting}
                    />
                  </div>
                  {errors.subject && (
                    <div className="error-message">{errors.subject.message}</div>
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
                      className="form-style"
                      placeholder="Votre message"
                      rows={3}
                      {...register("message")}
                      disabled={isSubmitting}
                    ></textarea>
                  </div>
                  {errors.message && (
                    <div className="error-message">{errors.message.message}</div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Envoi..." : "Envoyer"}
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
