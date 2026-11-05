
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

const forgotPassVerify = async ({ email, name, userId }) => {
  const safeName = escapeHtml(
    String(name || "").trim() || "there"
  );

const resetUrl =
  `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password/${encodeURIComponent(userId)}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset your password | HowToSell</title>
</head>

<body style="
  margin:0;
  padding:0;
  background-color:#F7F8F5;
  font-family:Arial,Helvetica,sans-serif;
  color:${DARK};
">

  <table role="presentation" cellpadding="0" cellspacing="0"
    border="0" width="100%"
    style="background-color:#F7F8F5;">
    <tr>
      <td align="center" style="padding:44px 16px;">

        <table role="presentation" cellpadding="0"
          cellspacing="0" border="0" width="100%"
          style="max-width:600px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding:0 0 28px;">
              <span style="
                font-family:Arial,Helvetica,sans-serif;
                font-size:30px;
                font-weight:800;
                letter-spacing:-1.8px;
                color:${DARK};
              ">
                howtosell<span style="color:${GREEN};">.</span>
              </span>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="
              background-color:#FFFFFF;
              border:1px solid #E2E8E1;
              border-radius:16px;
              overflow:hidden;
            ">

              <!-- Green accent -->
              <table role="presentation" width="100%"
                cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td height="5" style="
                    height:5px;
                    background-color:${GREEN};
                    font-size:0;
                    line-height:0;
                  ">
                    &nbsp;
                  </td>
                </tr>
              </table>

              <table role="presentation" width="100%"
                cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:40px 36px 36px;">

                    <!-- Badge -->
                    <table role="presentation" cellpadding="0"
                      cellspacing="0" border="0">
                      <tr>
                        <td style="
                          background-color:#E2F1EC;
                          border-radius:30px;
                          padding:9px 14px;
                        ">
                          <span style="
                            font-size:12px;
                            font-weight:700;
                            color:${GREEN};
                            letter-spacing:0.3px;
                          ">
                            PASSWORD RESET REQUEST
                          </span>
                        </td>
                      </tr>
                    </table>

                    <!-- Heading -->
                    <h1 style="
                      font-size:28px;
                      line-height:1.3;
                      letter-spacing:-0.8px;
                      color:${DARK};
                      margin:24px 0 16px;
                      font-weight:800;
                    ">
                      Reset your password
                    </h1>

                    <p style="
                      font-size:15px;
                      line-height:1.8;
                      color:${DARK};
                      margin:0 0 14px;
                    ">
                      Hi ${safeName},
                    </p>

                    <p style="
                      font-size:15px;
                      line-height:1.8;
                      color:${MUTED};
                      margin:0 0 16px;
                    ">
                      We received a request to reset the password
                      for your HowToSell account.
                    </p>

                    <p style="
                      font-size:15px;
                      line-height:1.8;
                      color:${MUTED};
                      margin:0 0 30px;
                    ">
                      To create a new password, simply click
                      the button below.
                    </p>

                    <!-- Reset button -->
                    <table role="presentation"
                      cellpadding="0" cellspacing="0"
                      border="0" width="100%">
                      <tr>
                        <td align="center" style="
                          background-color:#F1F8F5;
                          border:1px solid #D4E8DE;
                          border-radius:12px;
                          padding:30px 20px;
                        ">

                          <p style="
                            font-size:14px;
                            font-weight:700;
                            color:${DARK};
                            margin:0 0 20px;
                          ">
                            Ready to set a new password?
                          </p>

                          <table role="presentation"
                            cellpadding="0" cellspacing="0"
                            border="0">
                            <tr>
                              <td align="center"
                                bgcolor="${GREEN}"
                                style="border-radius:9px;">
                                <a href="${resetUrl}"
                                  style="
                                    display:inline-block;
                                    padding:15px 30px;
                                    font-size:14px;
                                    font-weight:700;
                                    line-height:1.4;
                                    color:#FFFFFF;
                                    background-color:${GREEN};
                                    text-decoration:none;
                                    border-radius:9px;
                                  ">
                                  Reset Password &rarr;
                                </a>
                              </td>
                            </tr>
                          </table>

                          <p style="
                            font-size:12px;
                            line-height:1.7;
                            color:${MUTED};
                            margin:18px 0 0;
                          ">
                            This button will take you to
                            the password reset page.
                          </p>

                        </td>
                      </tr>
                    </table>

                    <!-- Fallback link -->
                    <p style="
                      font-size:13px;
                      line-height:1.7;
                      color:${MUTED};
                      margin:26px 0 8px;
                    ">
                      Having trouble with the button?
                      Copy and paste this link into your browser:
                    </p>

                    <p style="
                      font-size:12px;
                      line-height:1.7;
                      margin:0 0 28px;
                      overflow-wrap:anywhere;
                      word-break:break-word;
                    ">
                      <a href="${resetUrl}" style="
                        color:${GREEN};
                        text-decoration:underline;
                      ">
                        ${resetUrl}
                      </a>
                    </p>

                    <!-- Security notice -->
                    <table role="presentation" width="100%"
                      cellpadding="0" cellspacing="0"
                      border="0">
                      <tr>
                        <td style="
                          background-color:#F7F8F5;
                          border-radius:10px;
                          padding:18px 20px;
                        ">
                          <p style="
                            font-size:13px;
                            line-height:1.7;
                            color:${MUTED};
                            margin:0;
                          ">
                            <strong style="color:${DARK};">
                              Didn't request this?
                            </strong><br />
                            If you didn't request a password reset,
                            you can safely ignore this email.
                            Your password will remain unchanged.
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Closing -->
                    <p style="
                      font-size:14px;
                      line-height:1.8;
                      color:${MUTED};
                      margin:28px 0 18px;
                    ">
                      If you need assistance, feel free
                      to contact our team.
                    </p>

                    <!-- Divider -->
                    <table role="presentation" width="100%"
                      cellpadding="0" cellspacing="0"
                      border="0">
                      <tr>
                        <td style="
                          border-bottom:1px solid #E8EDE8;
                          font-size:0;
                        ">
                          &nbsp;
                        </td>
                      </tr>
                    </table>

                    <!-- Signature -->
                    <p style="
                      font-size:14px;
                      line-height:1.8;
                      color:${DARK};
                      margin:24px 0 0;
                    ">
                      Best regards,<br />
                      <strong>The HowToSell Team</strong>
                    </p>

                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:28px 16px 0;">

              <p style="
                font-size:12px;
                line-height:1.7;
                color:#8B9990;
                margin:0;
              ">
                This email was sent because a password reset
                was requested for your HowToSell account.
              </p>

              <p style="
                font-size:12px;
                color:#8B9990;
                margin:10px 0 0;
              ">
                Dublin, Ireland
              </p>

              <p style="
                font-size:12px;
                color:#8B9990;
                margin:10px 0 0;
              ">
                &copy; ${new Date().getFullYear()}
                HowToSell. All rights reserved.
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

  const plainText = `Hi ${name || "there"},

We received a request to reset the password for your HowToSell account.

To create a new password, open the following link:

${resetUrl}

If you didn't request this password reset, you can safely ignore this email. Your password will remain unchanged.

If you need assistance, please contact our team.

Best regards,
The HowToSell Team

Dublin, Ireland`;

  const mailOptions = {
    from: '"HowToSell" <howtosell.inquiries@gmail.com>',
    to: email,
    subject: "Reset your password | HowToSell",
    html,
    text: plainText,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw error;
  }
};

module.exports = forgotPassVerify;
