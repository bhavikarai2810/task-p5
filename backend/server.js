const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const Mailjet = require("node-mailjet");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 3000;
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";

// Allow the Vite React frontend to call this backend.
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin === frontendOrigin || origin === "http://127.0.0.1:5173") {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.sendStatus(204);
    next();
});

app.use(express.json({ limit: "20kb" }));

const publicKey = process.env.MJ_APIKEY_PUBLIC;
const privateKey = process.env.MJ_APIKEY_PRIVATE;
const senderEmail = process.env.MAILJET_SENDER_EMAIL;
const senderName = process.env.MAILJET_SENDER_NAME || "DEV@Deakin";

let mailjet = null;
if (publicKey && privateKey) {
    mailjet = Mailjet.apiConnect(publicKey, privateKey);
} else {
    console.warn("Mailjet API credentials are missing. Set them in backend/.env.");
}

// This array is for coursework demonstration only. It resets when the server restarts.
const subscribers = new Set();

app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true, message: "Newsletter backend is running." });
});

app.post("/api/subscribe", async (req, res) => {
    const firstName = typeof req.body.firstName === "string" ? req.body.firstName.trim() : "";
    const lastName = typeof req.body.lastName === "string" ? req.body.lastName.trim() : "";
    const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailPattern.test(email) || email.length > 254) {
        return res.status(400).json({ success: false, message: "Please enter a valid email address." });
    }
    if (firstName.length > 60 || lastName.length > 60) {
        return res.status(400).json({ success: false, message: "Names must be 60 characters or fewer." });
    }
    if (subscribers.has(email)) {
        return res.status(409).json({ success: false, message: "This email is already subscribed." });
    }
    if (!mailjet || !senderEmail) {
        console.error("Mailjet is not configured. Check backend/.env.");
        return res.status(500).json({ success: false, message: "Email service is not configured. Please try again later." });
    }

    try {
        const greetingName = firstName ? ` ${firstName}` : "";
        const result = await mailjet
            .post("send", { version: "v3.1" })
            .request({
                Messages: [{
                    From: { Email: senderEmail, Name: senderName },
                    To: [{ Email: email, Name: `${firstName} ${lastName}`.trim() || email }],
                    Subject: "Welcome to DEV@Deakin!",
                    TextPart: `Welcome${greetingName} to DEV@Deakin! Thank you for subscribing to our newsletter.`,
                    HTMLPart: `<h1>Welcome${escapeHtml(greetingName)} to DEV@Deakin!</h1><p>Thank you for subscribing to our newsletter.</p><p>You will now receive updates from DEV@Deakin.</p><p><strong>DEV@Deakin Team</strong></p>`
                }]
            });

        const providerStatus = result && result.response ? result.response.status : "unknown";
        console.log("Mailjet email sent successfully.");
        console.log("Mailjet Status:", providerStatus);
        console.log("Subscriber:", email);
        subscribers.add(email);

        return res.status(202).json({ success: true, message: "Subscription successful! Please check your email." });
    } catch (error) {
        console.error("Mailjet request failed:", error.message || error);
        if (error && error.statusCode) console.error("Mailjet error status:", error.statusCode);
        return res.status(502).json({ success: false, message: "Unable to send the welcome email. Please check your email address or try again later." });
    }
});

function escapeHtml(value) {
    return value.replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
}

app.use((error, req, res, next) => {
    console.error("Unexpected server error:", error);
    res.status(500).json({ success: false, message: "An unexpected server error occurred." });
});

app.listen(PORT, () => {
    console.log(`Newsletter backend running at http://localhost:${PORT}`);
    console.log("Mailjet credentials configured:", Boolean(publicKey && privateKey && senderEmail));
});
