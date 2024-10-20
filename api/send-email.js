const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  console.log("Function started");
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body;
    console.log("Received data:", { name, email, subject });

    let transporter;
    try {
      console.log("Creating transporter");
      transporter = nodemailer.createTransport({
        host: "ssl0.ovh.net",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      console.log("Transporter created successfully");
    } catch (error) {
      console.error("Error creating transporter:", error);
      return res
        .status(500)
        .json({ message: "Failed to create email transporter" });
    }

    try {
      console.log("Attempting to send email");
      await transporter.sendMail({
        from: '"Merci Lille" <contact@mercilille.com>',
        to: "contact@mercilille.com",
        subject: `Nouveau message de ${name}: ${subject}`,
        text: `De: ${name} (${email})\n\nMessage: ${message}`,
        html: `<p><strong>De:</strong> ${name} (${email})</p><p><strong>Message:</strong> ${message}</p>`,
      });
      console.log("Email sent successfully");
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res
        .status(500)
        .json({ message: "Failed to send email", error: error.message });
    }
  } else {
    console.log("Method not allowed:", req.method);
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
