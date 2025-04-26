const nodemailer = require("nodemailer");

/**
 * Send email using Nodemailer
 * @param {Object} options - Email options (to, subject, text, html)
 */
const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define email options
  const mailOptions = {
    from: `${
      process.env.EMAIL_FROM || "JPBABA E-commerce <noreply@jpbaba.com>"
    }`,
    to: options.to,
    subject: options.subject,
    text: options.text || "",
    html: options.html || "",
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);

  console.log("Email sent: %s", info.messageId);
};

module.exports = sendEmail;
