const nodemailer = require("nodemailer");
const logger = require("./logger");

// Create reusable transporter object using SMTP transport
const createTransporter = () => {
  // For production, use actual SMTP credentials
  // For development, you can use services like Mailtrap or Gmail
  const config = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  };

  // Only create transporter if credentials are provided
  if (!config.auth.user || !config.auth.pass) {
    logger.warn(
      "Email credentials not configured. Email notifications disabled.",
    );
    return null;
  }

  return nodemailer.createTransport(config);
};

let transporter = null;

// Initialize transporter
const initializeTransporter = () => {
  transporter = createTransporter();
};

/**
 * Send email notification for new contact form submission
 */
const sendContactNotification = async (contactData) => {
  if (!transporter) {
    logger.info(
      "Email transporter not configured, skipping email notification",
    );
    return { success: false, reason: "Email not configured" };
  }

  const companyEmail = process.env.COMPANY_EMAIL || "Info@ctgroups.net";
  const companyName = process.env.COMPANY_NAME || "CPC Qatar";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .container {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #c49a6c 0%, #8b6914 100%);
          color: white;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .header p {
          margin: 10px 0 0;
          opacity: 0.9;
          font-size: 14px;
        }
        .content {
          padding: 30px;
        }
        .field {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        .field:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .field-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #888;
          margin-bottom: 5px;
        }
        .field-value {
          font-size: 16px;
          color: #333;
        }
        .message-box {
          background: #f8f9fa;
          border-left: 4px solid #c49a6c;
          padding: 15px;
          border-radius: 0 8px 8px 0;
          margin-top: 5px;
        }
        .footer {
          background: #f8f9fa;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        .footer a {
          color: #c49a6c;
          text-decoration: none;
        }
        .badge {
          display: inline-block;
          background: #c49a6c;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 New Contact Form Submission</h1>
          <p>${companyName} Website</p>
          <span class="badge">New Message</span>
        </div>
        <div class="content">
          <div class="field">
            <div class="field-label">From</div>
            <div class="field-value"><strong>${contactData.name}</strong></div>
          </div>
          
          <div class="field">
            <div class="field-label">Email</div>
            <div class="field-value">
              <a href="mailto:${contactData.email}" style="color: #c49a6c; text-decoration: none;">
                ${contactData.email}
              </a>
            </div>
          </div>
          
          ${
            contactData.phone
              ? `
          <div class="field">
            <div class="field-label">Phone</div>
            <div class="field-value">
              <a href="tel:${contactData.phone}" style="color: #c49a6c; text-decoration: none;">
                ${contactData.phone}
              </a>
            </div>
          </div>
          `
              : ""
          }
          
          ${
            contactData.company
              ? `
          <div class="field">
            <div class="field-label">Company</div>
            <div class="field-value">${contactData.company}</div>
          </div>
          `
              : ""
          }
          
          ${
            contactData.subject
              ? `
          <div class="field">
            <div class="field-label">Subject</div>
            <div class="field-value">${contactData.subject}</div>
          </div>
          `
              : ""
          }
          
          <div class="field">
            <div class="field-label">Message</div>
            <div class="message-box">${contactData.message.replace(/\n/g, "<br>")}</div>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent from the ${companyName} website contact form.</p>
          <p>
            <a href="${process.env.ADMIN_URL || "http://localhost:8080"}/admin/messages">
              View in Admin Dashboard →
            </a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
New Contact Form Submission
===========================

From: ${contactData.name}
Email: ${contactData.email}
${contactData.phone ? `Phone: ${contactData.phone}` : ""}
${contactData.company ? `Company: ${contactData.company}` : ""}
${contactData.subject ? `Subject: ${contactData.subject}` : ""}

Message:
${contactData.message}

---
This email was sent from the ${companyName} website contact form.
  `;

  const mailOptions = {
    from: `"${companyName} Website" <${process.env.SMTP_USER}>`,
    to: companyEmail,
    replyTo: contactData.email,
    subject: `📧 New Contact: ${contactData.subject || "Website Inquiry"} - ${contactData.name}`,
    text: textContent,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(`Contact notification email sent: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error(`Failed to send contact notification email: ${error.message}`);
    return { success: false, error: error.message };
  }
};

/**
 * Send auto-reply email to the contact
 */
const sendContactAutoReply = async (contactData) => {
  if (!transporter) {
    return { success: false, reason: "Email not configured" };
  }

  const companyName = process.env.COMPANY_NAME || "CPC Qatar";
  const companyEmail = process.env.COMPANY_EMAIL || "Info@ctgroups.net";

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Contacting Us</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .container {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background: linear-gradient(135deg, #c49a6c 0%, #8b6914 100%);
          color: white;
          padding: 30px 20px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        .content {
          padding: 30px;
        }
        .content p {
          margin-bottom: 16px;
        }
        .highlight-box {
          background: #f8f9fa;
          border-left: 4px solid #c49a6c;
          padding: 15px;
          border-radius: 0 8px 8px 0;
          margin: 20px 0;
        }
        .footer {
          background: #f8f9fa;
          padding: 20px;
          text-align: center;
          font-size: 12px;
          color: #666;
        }
        .footer a {
          color: #c49a6c;
          text-decoration: none;
        }
        .contact-info {
          margin-top: 20px;
          padding-top: 20px;
          border-top: 1px solid #eee;
        }
        .contact-info p {
          margin: 8px 0;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Contacting Us!</h1>
        </div>
        <div class="content">
          <p>Dear <strong>${contactData.name}</strong>,</p>
          
          <p>Thank you for reaching out to ${companyName}. We have received your message and appreciate your interest in our services.</p>
          
          <div class="highlight-box">
            <p style="margin: 0;"><strong>What happens next?</strong></p>
            <p style="margin: 10px 0 0;">Our team will review your inquiry and get back to you within <strong>24-48 hours</strong>. If your matter is urgent, please don't hesitate to call us directly.</p>
          </div>
          
          <p>Here's a summary of your message:</p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0;">
            ${contactData.subject ? `<p style="margin: 0 0 10px;"><strong>Subject:</strong> ${contactData.subject}</p>` : ""}
            <p style="margin: 0;"><strong>Message:</strong><br>${contactData.message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <div class="contact-info">
            <p><strong>Need immediate assistance?</strong></p>
            <p>📞 Phone: <a href="tel:+97444322743" style="color: #c49a6c;">+974 4432-2743</a></p>
            <p>📧 Email: <a href="mailto:${companyEmail}" style="color: #c49a6c;">${companyEmail}</a></p>
          </div>
        </div>
        <div class="footer">
          <p><strong>${companyName}</strong></p>
          <p>Mirqab Mall, Area No. 39, Street No.840<br>Building No.53, Block D – Office No. 307-308<br>P.O. Box: 15776, Doha, Qatar</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: `"${companyName}" <${process.env.SMTP_USER}>`,
    to: contactData.email,
    subject: `Thank You for Contacting ${companyName}`,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    logger.info(
      `Auto-reply email sent to ${contactData.email}: ${info.messageId}`,
    );
    return { success: true, messageId: info.messageId };
  } catch (error) {
    logger.error(`Failed to send auto-reply email: ${error.message}`);
    return { success: false, error: error.message };
  }
};

module.exports = {
  initializeTransporter,
  sendContactNotification,
  sendContactAutoReply,
};
