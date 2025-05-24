// portfolio-project/server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
// IMPORTANT: For a live server, you might get the port from environment variables
const port = process.env.PORT || 3001; // Using port 3001

// --- Middleware ---
app.use(cors()); // Enable CORS for all origins (for development)
// For production, restrict to your actual portfolio domain:
// app.use(cors({ origin: 'https://your-portfolio-domain.com' }));

app.use(bodyParser.json()); // To parse JSON data from the request body
app.use(bodyParser.urlencoded({ extended: true })); // To parse URL-encoded data

// --- POST Route to Handle Form Submissions ---
app.post('/send-message', (req, res) => {
    const { name, email, subject, message } = req.body;

    // --- Basic Server-Side Validation ---
    if (!name || !name.trim() || !email || !email.trim() || !message || !message.trim()) {
        return res.status(400).json({ success: false, message: 'Validation Error: Name, email, and message are required.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ success: false, message: 'Validation Error: Invalid email format.' });
    }

    // --- Configure Nodemailer ---
    // **IMPORTANT SECURITY NOTE:**
    // DO NOT hardcode your email credentials in a real application.
    // Use environment variables (e.g., process.env.EMAIL_USER, process.env.EMAIL_PASS)
    // and a .env file (add .env to your .gitignore).
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Or your email provider (e.g., 'hotmail', 'yahoo')
        auth: {
            user: 'rajputiblood69@gmail.com',     // Replace with your sending Gmail address
            pass: '9639883857'          // Replace with your Gmail App Password (recommended) or regular password
        }
    });

    const mailOptions = {
        from: `"${name.trim()}" <${email.trim()}>`, // Shows sender's name and email
        to: 'rajputiblood69@gmail.com', // Replace with the email where you want to receive messages
        replyTo: email.trim(), // Allows direct reply to the user
        subject: `Portfolio Contact: ${subject ? subject.trim() : 'No Subject'} (from ${name.trim()})`,
        html: `
            <h3>New Message from Portfolio Contact Form:</h3>
            <p><strong>Name:</strong> ${name.trim()}</p>
            <p><strong>Email:</strong> ${email.trim()}</p>
            <p><strong>Subject:</strong> ${subject ? subject.trim() : 'N/A'}</p>
            <hr>
            <p><strong>Message:</strong></p>
            <p>${message.trim().replace(/\n/g, '<br>')}</p>
            <hr>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({
                success: false,
                message: 'Sorry, the message could not be sent. Please try again later or contact me directly.'
            });
        }
        console.log('Message sent successfully: %s', info.messageId);
        return res.status(200).json({
            success: true,
            message: 'Message sent successfully! Thank you for reaching out.'
        });
    });
});

// --- Basic Route for Testing if Server is Up ---
app.get('/', (req, res) => {
    res.send('Portfolio Backend Server is Running!');
});

// --- Start the Server ---
app.listen(port, () => {
    console.log(`Backend server for portfolio is running on http://localhost:${3306}`);
    console.log(`Contact form submissions should be sent to POST http://localhost:${3306}/send-message`);
});