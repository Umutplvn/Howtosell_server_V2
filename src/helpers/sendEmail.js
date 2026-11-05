
const nodemailer = require("nodemailer");

const GREEN = "#087F73";
const DARK = "#172A23";
const MUTED = "#64736B";
const BORDER = "#E2E8E1";

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

const hasValue = (value) =>
  value !== undefined &&
  value !== null &&
  String(value).trim() !== "";

const detailRow = (label, value) => {
  if (!hasValue(value)) return "";

  return `
    <tr>
      <td style="
        padding:14px 16px;
        border-bottom:1px solid #EDF1ED;
        vertical-align:top;
      ">
        <p style="
          margin:0 0 6px;
          font-size:11px;
          font-weight:700;
          letter-spacing:0.3px;
          text-transform:uppercase;
          color:${MUTED};
        ">
          ${escapeHtml(label)}
        </p>
        <p style="
          margin:0;
          font-size:14px;
          line-height:1.65;
          color:${DARK};
          overflow-wrap:anywhere;
          word-break:break-word;
          white-space:pre-wrap;
        ">${escapeHtml(value)}</p>
      </td>
    </tr>
  `;
};

const section = (title, rows) => {
  if (!rows.trim()) return "";

  return `
    <table role="presentation" width="100%"
      cellpadding="0" cellspacing="0" border="0"
      style="
        border:1px solid ${BORDER};
        border-radius:12px;
        margin-bottom:22px;
        border-collapse:separate;
        border-spacing:0;
      ">
      <tr>
        <td style="
          background-color:#F1F8F5;
          padding:15px 16px;
          border-bottom:1px solid ${BORDER};
        ">
          <p style="
            margin:0;
            font-size:14px;
            font-weight:800;
            color:${GREEN};
          ">
            ${escapeHtml(title)}
          </p>
        </td>
      </tr>
      ${rows}
    </table>
  `;
};

const sendEmail = async ({
  name, email, phone, companyName, companyWebsite,
  role, teamSize, investment, when, challenge
}) => {
  const fullName = name || "New potential client";

  const contactRows = [
    detailRow("Name", name),
    detailRow("Email", email),
    detailRow("WhatsApp Number", phone),
  ].join("");

  const companyRows = [
    detailRow("Business Name", companyName),
    detailRow("Website or Social Profile", companyWebsite),
    detailRow("Your Role", role),
    detailRow("People Handling Sales", teamSize),
  ].join("");

  const salesRows = [
    detailRow("Investment You Can Consider", investment),
    detailRow("When Would You Want to Start?", when),
    detailRow("Where Are Deals Getting Stuck?", challenge),
  ].join("");

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport"
    content="width=device-width, initial-scale=1.0" />
  <title>New Customer Lead | HowToSell</title>
</head>

<body style="
  margin:0;
  padding:0;
  background-color:#F7F8F5;
  font-family:Arial,Helvetica,sans-serif;
  color:${DARK};
">

  <table role="presentation" width="100%"
    cellpadding="0" cellspacing="0" border="0"
    style="background-color:#F7F8F5;">
    <tr>
      <td align="center" style="padding:40px 16px;">

        <table role="presentation" width="100%"
          cellpadding="0" cellspacing="0" border="0"
          style="max-width:620px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding:0 0 28px;">
              <span style="
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
              border:1px solid ${BORDER};
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
                  ">&nbsp;</td>
                </tr>
              </table>

              <table role="presentation" width="100%"
                cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:36px 30px;">

                    <!-- Badge -->
                    <table role="presentation"
                      cellpadding="0" cellspacing="0"
                      border="0">
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
                            NEW LEAD RECEIVED
                          </span>
                        </td>
                      </tr>
                    </table>

                    <h1 style="
                      margin:24px 0 12px;
                      font-size:28px;
                      line-height:1.3;
                      font-weight:800;
                      letter-spacing:-0.8px;
                      color:${DARK};
                    ">
                      You've got a new lead!
                    </h1>

                    <p style="
                      font-size:15px;
                      line-height:1.8;
                      color:${MUTED};
                      margin:0 0 26px;
                    ">
                      Hi Babar,<br />
                      A potential client has submitted the
                      HowToSell application form.
                      Here are their details.
                    </p>

                    <!-- Lead summary -->
                    <table role="presentation" width="100%"
                      cellpadding="0" cellspacing="0"
                      border="0"
                      style="
                        background-color:#F1F8F5;
                        border:1px solid #D4E8DE;
                        border-radius:12px;
                        margin-bottom:28px;
                      ">
                      <tr>
                        <td style="padding:22px 20px;">

                          <p style="
                            margin:0 0 8px;
                            font-size:11px;
                            font-weight:700;
                            letter-spacing:1px;
                            color:${GREEN};
                          ">
                            POTENTIAL CLIENT
                          </p>

                          <p style="
                            margin:0 0 8px;
                            font-size:22px;
                            font-weight:800;
                            color:${DARK};
                            overflow-wrap:anywhere;
                          ">
                            ${escapeHtml(fullName)}
                          </p>

                          ${
                            hasValue(companyName)
                              ? `<p style="
                                  margin:0;
                                  font-size:14px;
                                  color:${MUTED};
                                ">
                                  ${escapeHtml(companyName)}
                                </p>`
                              : ""
                          }

                        </td>
                      </tr>
                    </table>

                    <!-- Details -->
                    ${section(
                      "Contact Information",
                      contactRows
                    )}

                    ${section(
                      "Company Details",
                      companyRows
                    )}

                    ${section(
                      "Application Details",
                      salesRows
                    )}

                    <!-- Closing -->
                    <p style="
                      font-size:14px;
                      line-height:1.8;
                      color:${MUTED};
                      margin:18px 0 24px;
                    ">
                      You can review this lead and follow up
                      using the contact details above.
                    </p>

                    <!-- Divider -->
                    <table role="presentation" width="100%"
                      cellpadding="0" cellspacing="0"
                      border="0">
                      <tr>
                        <td style="
                          border-bottom:1px solid #E8EDE8;
                          font-size:0;
                        ">&nbsp;</td>
                      </tr>
                    </table>

                    <p style="
                      margin:22px 0 0;
                      font-size:14px;
                      line-height:1.8;
                      color:${DARK};
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
            <td align="center"
              style="padding:28px 16px 0;">

              <p style="
                margin:0;
                font-size:12px;
                line-height:1.7;
                color:#8B9990;
              ">
                Internal notification — new customer
                application received.
              </p>

              <p style="
                margin:10px 0 0;
                font-size:12px;
                color:#8B9990;
              ">
                Dublin, Ireland
              </p>

              <p style="
                margin:10px 0 0;
                font-size:12px;
                color:#8B9990;
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

  const fields = [
    ["Name", name],
    ["Email", email],
    ["WhatsApp Number", phone],
    ["Business Name", companyName],
    ["Website or Social Profile", companyWebsite],
    ["Your Role", role],
    ["People Handling Sales", teamSize],
    ["Investment You Can Consider", investment],
    ["When Would You Want to Start?", when],
    ["Where Are Deals Getting Stuck?", challenge],
  ];

  const plainText = [
    "NEW CUSTOMER LEAD | HOWTOSELL",
    "",
    "Hi Babar,",
    "",
    "A potential client has submitted the application form.",
    "",
    ...fields
      .filter(([, value]) => hasValue(value))
      .map(([label, value]) => `${label}: ${value}`),
    "",
    "Best regards,",
    "The HowToSell Team",
  ].join("\\n");

  const mailOptions = {
    from: '"HowToSell" <howtosell.inquiries@gmail.com>',
    to: "babar@howtosell.io",
    // Burasi degistirilecek
    subject: `New Customer Lead | ${fullName.replace(/[\\r\\n]/g, " ")}`,
    html,
    text: plainText,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("New lead email sent:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending new lead email:", error);
    throw error;
  }
};

module.exports = sendEmail;
