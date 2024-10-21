const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body;

    let transporter;
    try {
      transporter = nodemailer.createTransport({
        host: "ssl0.ovh.net",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        logger: true,
      });

      await transporter.verify();
    } catch (error) {
      console.error("Error creating or verifying transporter:", error);
      return res.status(500).json({
        message: "Failed to create email transporter",
        error: error.message,
      });
    }

    try {
      const info = await transporter.sendMail({
        from: `${name} <${email}>`,
        to: process.env.EMAIL_USER,
        subject: `${subject}`,
        text: `De: ${name} (${email})\n\nMessage: ${message}`,
        html: `<p><strong>De:</strong> ${name} (${email})</p><p><strong>Message:</strong> ${message}</p>`,
      });
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
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
