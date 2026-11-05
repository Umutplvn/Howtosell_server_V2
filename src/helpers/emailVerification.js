
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

const sendVerificationEmail = async (email, passcode, name) => {
  const safeName = escapeHtml(name?.trim() || "there");
  const safePasscode = escapeHtml(String(passcode));
  const plainName = name?.trim() || "there";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify your email | HowToSell</title>
</head>

<body style="margin:0;padding:0;background-color:#F7F8F5;font-family:Arial,Helvetica,sans-serif;color:${DARK};">

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
                  <td height="5"
                    style="height:5px;background-color:${GREEN};font-size:0;line-height:0;">
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
                            EMAIL VERIFICATION
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
                      Verify your email address
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
                      margin:0 0 28px;
                    ">
                      Welcome to HowToSell! You're just one step
                      away from completing your registration.
                      Enter the verification code below to confirm
                      your email address.
                    </p>

                    <!-- Verification code -->
                    <table role="presentation" width="100%"
                      cellpadding="0" cellspacing="0" border="0"
                      style="
                        background-color:#F1F8F5;
                        border:1px solid #D4E8DE;
                        border-radius:12px;
                      ">
                      <tr>
                        <td align="center" style="padding:30px 16px;">

                          <p style="
                            font-size:11px;
                            font-weight:700;
                            letter-spacing:1.5px;
                            color:${MUTED};
                            margin:0 0 15px;
                          ">
                            YOUR VERIFICATION CODE
                          </p>

                          <p style="
                            font-family:Arial,Helvetica,sans-serif;
                            font-size:38px;
                            line-height:1.3;
                            font-weight:800;
                            letter-spacing:7px;
                            color:${GREEN};
                            margin:0;
                            overflow-wrap:anywhere;
                          ">
                            ${safePasscode}
                          </p>

                          <p style="
                            font-size:12px;
                            line-height:1.6;
                            color:${MUTED};
                            margin:15px 0 0;
                          ">
                            Copy this code and enter it on the
                            verification page.
                          </p>

                        </td>
                      </tr>
                    </table>

                    <!-- Security notice -->
                    <table role="presentation" width="100%"
                      cellpadding="0" cellspacing="0" border="0"
                      style="margin-top:26px;">
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
                              Security reminder
                            </strong><br />
                            Never share this verification code with
                            anyone. The HowToSell team will never
                            ask you to disclose your code.
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
                      If you didn't create a HowToSell account,
                      you can safely ignore this email.
                    </p>

                    <!-- Divider -->
                    <table role="presentation" width="100%"
                      cellpadding="0" cellspacing="0" border="0">
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
                This is an automated email sent to verify
                your HowToSell account.
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

  const plainText = `Hi ${plainName},

Welcome to HowToSell!

Please use the following code to verify your email address:

${passcode}

Enter this code on the verification page to complete your registration.

Never share this verification code with anyone.

If you didn't create a HowToSell account, you can ignore this email.

Best regards,
The HowToSell Team

Dublin, Ireland`;

  const mailOptions = {
    from: '"HowToSell" <howtosell.inquiries@gmail.com>',
    to: email,
    subject: "Verify your email address | HowToSell",
    html,
    text: plainText,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

module.exports = sendVerificationEmail;
