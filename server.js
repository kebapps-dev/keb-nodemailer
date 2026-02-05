//options are set in environment variables or default values are used
//SMTP_HOST, MAIL_FROM, PORT (should be 4000 which is default)

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

app.get('/', (_req, res) => {
  res.send('Backend is running');
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'kebamerica-com.mail.protection.outlook.com',
  port: 25,
  secure: false, // true only for 465
  tls: {
    rejectUnauthorized: false
  },
  connectionTimeout: 30000,
});

app.post('/api/send-email', async (req, res) => {
  const { to, subject, text, attachments } = req.body;

  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      text,
    });

    // Add attachments if they exist
    if (attachments && Array.isArray(attachments) && attachments.length > 0) {
      mailOptions.attachments = attachments.map(attachment => ({
        filename: attachment.filename,
        content: attachment.content,
        encoding: 'base64'
      }));
    }
    
    console.log('Email sent:', info.messageId);
    res.json({ success: true });
  } catch (error) {
    console.error('SMTP error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
