const nodemailer = require("nodemailer");
const handlebars = require("handlebars");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendEmail = async (
  email,
  name,
  otp
) => {
  const emailTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            font-family: Arial, sans-serif;
          }
          .header {
            background-color: #f8f8f8;
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid #ddd;
          }
          .content {
            padding: 20px;
            text-align: left;
          }
          .footer {
            background-color: #f8f8f8;
            padding: 10px;
            text-align: center;
            border-top: 1px solid #ddd;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Welcome, {{name}}</h2>
          </div>
          <div class="content">
            <p>Dear {{name}},</p>
            <p>Your otp to verify email is {{otp}}</p>
            <p>Please verify otp</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 saurabh kumar. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const template = handlebars.compile(emailTemplate);
  const htmlToSend = template({ name, otp });

  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to: email,
    subject: "Your gadget api email OTP",
    html: htmlToSend,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: %s", info.messageId);
    return info.messageId;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email");
  }
};
module.exports = sendEmail;