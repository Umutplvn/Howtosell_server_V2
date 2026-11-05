
const nodemailer = require("nodemailer");

const GREEN = "#087F73";
const DARK = "#172A23";
const MUTED = "#64736B";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "howtosell.inquiries@gmail.com",
    pass: process.env.pass,
  },
  connectionTimeout: 60 * 1000,
});

const capitalizeFirstLetter = (value = "") => {
  const text = String(value).trim();
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const escapeHtml = (value = "") =>
  String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });

const confirmationEmail = async (email, name) => {
  const formattedName = capitalizeFirstLetter(name);
  const safeName = escapeHtml(formattedName || "there");

  const youtubeUrl = "https://www.youtube.com/@babaraskary";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <title>We've received your application | HowToSell</title>
</head>

<body style="margin:0;padding:0;background-color:#F7F8F5;font-family:Arial,Helvetica,sans-serif;color:${DARK};">

  <table role="presentation" cellpadding="0" cellspacing="0" border="0"
    width="100%" style="background-color:#F7F8F5;">
    <tr>
      <td align="center" style="padding:44px 16px;">

        <!-- Main container -->
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"
          width="100%" style="max-width:600px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding:0 0 28px;">
              <span style="font-family:Arial,Helvetica,sans-serif;font-size:30px;font-weight:800;letter-spacing:-1.8px;color:${DARK};">
                howtosell<span style="color:${GREEN};">.</span>
              </span>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background-color:#FFFFFF;border:1px solid #E2E8E1;border-radius:16px;overflow:hidden;">

              <!-- Accent line -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td height="5" style="height:5px;background-color:${GREEN};font-size:0;line-height:0;">&nbsp;</td>
                </tr>
              </table>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:40px 36px 36px;">

                    <!-- Status -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background-color:#E2F1EC;border-radius:30px;padding:9px 14px;">
                          <span style="font-size:12px;font-weight:700;color:${GREEN};letter-spacing:0.3px;">
                            &#10003; APPLICATION RECEIVED
                          </span>
                        </td>
                      </tr>
                    </table>

                    <!-- Heading -->
                    <h1 style="font-size:28px;line-height:1.3;letter-spacing:-0.8px;color:${DARK};margin:24px 0 16px;font-weight:800;">
                      Thanks for reaching out!
                    </h1>

                    <p style="font-size:15px;line-height:1.8;color:${DARK};margin:0 0 14px;">
                      Hi ${safeName},
                    </p>

                    <p style="font-size:15px;line-height:1.8;color:${MUTED};margin:0 0 28px;">
                      Thank you for taking the time to submit your application to HowToSell.
                      We've received your information and look forward to learning more
                      about your business and goals.
                    </p>

                    <!-- Next steps -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"
                      style="background-color:#F7FAF8;border:1px solid #E2E8E1;border-radius:12px;">
                      <tr>
                        <td style="padding:24px;">

                          <h2 style="font-size:16px;font-weight:800;color:${DARK};margin:0 0 22px;">
                            What happens next?
                          </h2>

                          <!-- Step 1 -->
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="36" valign="top">
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td align="center" valign="middle"
                                      style="width:28px;height:28px;background-color:#E2F1EC;border-radius:50%;font-size:13px;font-weight:700;color:${GREEN};">
                                      1
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td valign="top" style="padding:1px 0 20px;">
                                <p style="margin:0 0 5px;font-size:14px;font-weight:700;color:${DARK};">
                                  Application review
                                </p>
                                <p style="margin:0;font-size:13px;line-height:1.7;color:${MUTED};">
                                  We'll review your information to understand your
                                  goals, challenges, and how we may be able to help.
                                </p>
                              </td>
                            </tr>
                          </table>

                          <!-- Step 2 -->
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                            <tr>
                              <td width="36" valign="top">
                                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td align="center" valign="middle"
                                      style="width:28px;height:28px;background-color:#E2F1EC;border-radius:50%;font-size:13px;font-weight:700;color:${GREEN};">
                                      2
                                    </td>
                                  </tr>
                                </table>
                              </td>
                              <td valign="top" style="padding-top:1px;">
                                <p style="margin:0 0 5px;font-size:14px;font-weight:700;color:${DARK};">
                                  Let's connect
                                </p>
                                <p style="margin:0;font-size:13px;line-height:1.7;color:${MUTED};">
                                  If we're a good fit, we'll be in touch within
                                  24 hours to schedule a call and discuss the next steps.
                                </p>
                              </td>
                            </tr>
                          </table>

                        </td>
                      </tr>
                    </table>

                    <!-- Resources -->
                    <h2 style="font-size:17px;font-weight:800;color:${DARK};margin:34px 0 10px;">
                      In the meantime...
                    </h2>

                    <p style="font-size:14px;line-height:1.8;color:${MUTED};margin:0 0 22px;">
                      Explore our YouTube channel for practical sales tips
                      and insights to help grow your business.
                    </p>

                    <!-- Smaller YouTube button -->
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding:0 0 10px;">
                          <a href="${youtubeUrl}"
                            style="display:inline-block;background-color:${GREEN};border-radius:8px;padding:10px 15px;font-size:12px;font-weight:700;color:#FFFFFF;text-decoration:none;">
                            Explore YouTube &rarr;
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Divider -->
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="border-bottom:1px solid #E8EDE8;padding-top:28px;font-size:0;">&nbsp;</td>
                      </tr>
                    </table>

                    <!-- Signature -->
                    <p style="font-size:14px;line-height:1.8;color:${MUTED};margin:25px 0 18px;">
                      Looking forward to connecting with you soon!
                    </p>

                    <p style="font-size:14px;line-height:1.7;color:${DARK};margin:0;">
                      Best regards,<br />
                      <strong style="font-size:15px;">Babar Askary</strong><br />
                      <span style="color:${MUTED};font-size:13px;">HowToSell</span>
                    </p>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:28px 16px 0;">
              <p style="font-size:12px;line-height:1.7;color:#8B9990;margin:0;">
                You're receiving this email because you submitted
                an application to HowToSell.
              </p>
              <p style="font-size:12px;color:#8B9990;margin:10px 0 0;">
                &copy; ${new Date().getFullYear()} HowToSell. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;

  const plainText = `Hi ${formattedName || "there"},

Thank you for submitting your application to HowToSell.

Here's what happens next:

1. We'll review your information to understand your goals and challenges.

2. If we're a good fit, we'll be in touch within 24 hours to schedule a call.

Explore our YouTube channel for sales tips and insights:
${youtubeUrl}

Looking forward to connecting with you soon!

Best regards,
Babar Askary
HowToSell`;

  const mailOptions = {
    from: '"HowToSell" <howtosell.inquiries@gmail.com>',
    to: email,
    subject: "We've received your application | HowToSell",
    html,
    text: plainText,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw error;
  }
};

module.exports = confirmationEmail;
