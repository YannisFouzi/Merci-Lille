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
    // Effacer l'erreur lorsque l'utilisateur commence Ã  taper
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("ðŸš€ DÃ‰BUT ENVOI EMAIL - Form submitted");

    if (validateForm()) {
      console.log("âœ… Validation du formulaire rÃ©ussie");
      console.log("ðŸ“ DonnÃ©es Ã  envoyer:", formData);

      try {
        // Construire l'URL complÃ¨te
        const baseUrl = window.location.origin;
        const apiUrl = `${baseUrl}/api/send-email`;
        console.log("ðŸŒ URL API complÃ¨te:", apiUrl);
        console.log("ðŸ  Origin actuel:", window.location.origin);
        console.log("ðŸ“ Pathname actuel:", window.location.pathname);

        const requestConfig = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest", // Header CSRF requis
          },
          body: JSON.stringify(formData),
        };

        console.log("ðŸ“¤ Configuration de la requÃªte:", requestConfig);
        console.log("ðŸ“¦ Body JSON:", JSON.stringify(formData, null, 2));

        console.log("â³ Envoi de la requÃªte fetch...");
        const response = await fetch("/api/send-email", requestConfig);

        console.log("ðŸ“¬ RÃ©ponse reÃ§ue:");
        console.log("  - Status:", response.status);
        console.log("  - StatusText:", response.statusText);
        console.log("  - OK:", response.ok);
        console.log(
          "  - Headers:",
          Object.fromEntries(response.headers.entries())
        );

        if (response.ok) {
          console.log("ðŸŽ‰ SuccÃ¨s! Email envoyÃ©");
          const successData = await response.json();
          console.log("ðŸ“¨ DonnÃ©es de succÃ¨s:", successData);

          setConfirmationMessage("Email envoyÃ© avec succÃ¨s !");
          // RÃ©initialiser le formulaire
          setFormData({ name: "", email: "", subject: "", message: "" });
          // Effacer le message de confirmation aprÃ¨s 5 secondes
          setTimeout(() => setConfirmationMessage(""), 5000);
        } else {
          console.log("âŒ Erreur dans la rÃ©ponse - Status:", response.status);

          let errorData;
          try {
            errorData = await response.json();
            console.log("ðŸ“„ DonnÃ©es d'erreur reÃ§ues:", errorData);
          } catch (jsonError) {
            console.log("âš ï¸ Impossible de parser la rÃ©ponse JSON:", jsonError);
            console.log("ðŸ“„ RÃ©ponse brute:", await response.text());
          }

          if (response.status === 429) {
            console.log("ðŸš« Rate limit atteint");
            setConfirmationMessage(
              "Trop d'emails envoyÃ©s. Veuillez rÃ©essayer dans une heure."
            );
          } else if (response.status >= 500) {
            console.log("ðŸ”¥ Erreur serveur 5xx");
            setConfirmationMessage(
              "Erreur serveur. Veuillez rÃ©essayer plus tard."
            );
          } else if (errorData?.message) {
            console.log("ðŸ’¬ Message d'erreur spÃ©cifique:", errorData.message);
            setConfirmationMessage(errorData.message);
          } else {
            console.log("â“ Erreur non spÃ©cifiÃ©e");
            setConfirmationMessage(
              "Ã‰chec de l'envoi de l'email. Veuillez rÃ©essayer."
            );
          }
        }
      } catch (error: unknown) {
  console.log("Erreur lors de l'envoi du message");
  if (error instanceof Error) {
    console.error("Type:", error.name);
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);

    if (error.name === "TypeError" && error.message.includes("fetch")) {
      console.log("Erreur de reseau ou CORS detectee");
    } else if (error.name === "AbortError") {
      console.log("Requete interrompue/timeout");
    }
  } else {
    console.error("Erreur inconnue:", error);
  }

  setConfirmationMessage("Une erreur est survenue. Veuillez reessayer plus tard.");
}
    } else {
      console.log("âŒ Validation du formulaire Ã©chouÃ©e");
      console.log("ðŸ” Erreurs:", errors);
    }

    console.log("ðŸ FIN ENVOI EMAIL");
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
              <h4 className="mb-4 pb-3">E-mail envoyÃ© avec succÃ¨s!</h4>
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


