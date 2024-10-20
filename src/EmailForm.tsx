import { faEnvelope, faMessage } from "@fortawesome/free-regular-svg-icons";
import { faAt, faFont } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const EmailForm: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Email sent successfully");
          setIsFlipped(true);
        } else {
          console.error("Failed to send email");
        }
      } catch (error) {
        console.error("Error sending email:", error);
      }
    }
  };

  return (
    <div className="card-3d-wrap mx-auto">
      <div className={`card-3d-wrapper ${isFlipped ? "is-flipped" : ""}`}>
        <div className="card-front">
          <div className="center-wrap">
            <div className="section text-center">
              <h4 className="mb-4 pb-3">Envoyer un e-mail</h4>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <FontAwesomeIcon icon={faFont} className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    className="form-style"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && (
                    <div className="error-message">{errors.name}</div>
                  )}
                </div>
                <div className="form-group mt-2">
                  <FontAwesomeIcon icon={faAt} className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    className="form-style"
                    placeholder="Votre email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <div className="error-message">{errors.email}</div>
                  )}
                </div>
                <div className="form-group mt-2">
                  <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                  <input
                    type="text"
                    name="subject"
                    className="form-style"
                    placeholder="Objet"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                  {errors.subject && (
                    <div className="error-message">{errors.subject}</div>
                  )}
                </div>
                <div className="form-group mt-2">
                  <FontAwesomeIcon icon={faMessage} className="input-icon" />
                  <textarea
                    name="message"
                    className="form-style"
                    placeholder="Votre message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
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
