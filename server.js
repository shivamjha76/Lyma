const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;
app.use(cors({
  origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));
app.use(bodyParser.json());

// In-memory OTP store (for demo; use DB for production)
const otpStore = {};

// Configure nodemailer (Gmail SMTP)
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'yourgmail@gmail.com', // <-- Yahan apna Gmail address daalein
		pass: 'your_app_password' // <-- Yahan apna Gmail App Password daalein
	}
});

// Generate 4-digit OTP
function generateOTP() {
	return Math.floor(1000 + Math.random() * 9000).toString();
}

// Send OTP API
app.post('/api/send-otp', async (req, res) => {
	console.log('Received OTP request for:', req.body.email);
	const { email } = req.body;
	if (!email) return res.status(400).json({ error: 'Email required' });
	const otp = generateOTP();
	otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // 5 min expiry
	try {
		await transporter.sendMail({
			from: 'Lyma OTP <YOUR_GMAIL_ADDRESS>',
			to: email,
			subject: 'Your Lyma OTP',
			text: `Your OTP is: ${otp}`
		});
		console.log('OTP sent to:', email, 'OTP:', otp);
		res.json({ success: true });
	} catch (err) {
		console.error('Failed to send OTP:', err);
		res.status(500).json({ error: 'Failed to send OTP' });
	}
});

// Verify OTP API
app.post('/api/verify-otp', (req, res) => {
	const { email, otp } = req.body;
	const record = otpStore[email];
	if (!record) return res.status(400).json({ error: 'No OTP sent to this email' });
	if (Date.now() > record.expires) return res.status(400).json({ error: 'OTP expired' });
	if (record.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' });
	delete otpStore[email];
	res.json({ success: true });
});

app.listen(PORT, () => {
	console.log(`OTP server running on http://localhost:${PORT}`);
});

// You can delete or ignore this file now. Firebase email verification is being used, so custom OTP backend is not needed.
