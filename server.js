const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get('/', (req, res) => {
    res.send('Email Server Running 🚀');
});

// EMAIL CONFIG
const EMAIL_USER = 'gobright.growth@gmail.com';
const EMAIL_PASS = 'enat chzl pjur aymm';

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

// Function to send email
function sendMail(subject, text, res, replyToEmail) {
    const mailOptions = {
        from: `"GoBright Web Forms" <${EMAIL_USER}>`,
        to: EMAIL_USER,
        subject: subject,
        text: text,
        replyTo: replyToEmail || EMAIL_USER
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Email Error:', error);
            return res.status(500).json({
                status: "error",
                message: "Email not sent",
                error: error.message
            });
        }

        console.log("Email sent:", info.response);

        return res.json({
            status: "success",
            message: "Email sent successfully"
        });
    });
}

// SINGLE ENDPOINT FOR ALL FORMS
app.post('/send-email', (req, res) => {
    console.log("Form Submission Data:", req.body);

    const {
        name,
        email,
        mobileNumber,
        location,
        subject,
        message,
        deviceType,
        issueDescription
    } = req.body;

    // Check if it's a Contact Form (has subject or message)
    const isContactForm = subject || message;
    const formType = isContactForm ? 'Contact Us Enquiry' : 'Repair Booking/Sales';
    const emailSubject = isContactForm ?
        `New Contact Enquiry: ${subject || 'No Subject'}` :
        `New Service/Sales Request from ${name}`;

    let text = `You have a new ${formType}!\n\n`;
    text += `Customer Name: ${name || 'Not provided'}\n`;
    text += `Email: ${email || 'Not provided'}\n`;
    text += `Mobile Number: ${mobileNumber || 'Not provided'}\n`;
    text += `Location: ${location || 'Not provided'}\n`;

    if (isContactForm) {
        text += `Subject: ${subject || 'Not provided'}\n`;
        text += `Message:\n${message || 'Not provided'}\n`;
    } else {
        text += `Device Type: ${deviceType || 'Not provided'}\n`;
        text += `Issue/Details:\n${issueDescription || 'Not provided'}\n`;
    }

    sendMail(emailSubject, text, res, email);
});

// START SERVER
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});