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
        debug: console.log,
        logger: true,
      });
      console.log("Transporter created successfully");

      await transporter.verify();
      console.log("SMTP connection verified successfully");
    } catch (error) {
      console.error("Error creating or verifying transporter:", error);
      return res.status(500).json({
        message: "Failed to create email transporter",
        error: error.message,
      });
    }

    try {
      console.log("Attempting to send email");
      const info = await transporter.sendMail({
        from: `${name} <${email}>`,
        to: process.env.EMAIL_USER,
        subject: `${subject}`,
        text: `De: ${name} (${email})\n\nMessage: ${message}`,
        html: `<p><strong>De:</strong> ${name} (${email})</p><p><strong>Message:</strong> ${message}</p>`,
      });
      console.log("Email sent successfully:", info.messageId);
      res.status(200).json({
        message: "Email sent successfully",
        messageId: info.messageId,
      });
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
