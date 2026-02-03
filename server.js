const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

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
  const { to, subject, text } = req.body;

  try {
    const info = await transporter.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to,
      subject,
      text,
    });

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
