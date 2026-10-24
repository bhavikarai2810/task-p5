import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

function HomePage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubscribe = async (event) => {
        event.preventDefault();
        setMessage("");
        setMessageType("");

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.trim())) {
            setMessage("Please enter a valid email address.");
            setMessageType("error");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/subscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim().toLowerCase()
                })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Subscription failed. Please try again.");
            }

            setMessage(data.message || "Subscription successful! Please check your email.");
            setMessageType("success");
            setFirstName("");
            setLastName("");
            setEmail("");
        } catch (error) {
            console.error("Newsletter subscription error:", error);
            setMessage(error.message || "Could not connect to the server. Please try again.");
            setMessageType("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="home-page">
            <section className="home-intro">
                <p className="home-eyebrow">DEV@Deakin Community</p>
                <h1>Welcome to DEV@Deakin</h1>
                <p>Discover ideas, share knowledge, and connect with the DEV@Deakin community.</p>
            </section>

            <section className="newsletter-card" aria-labelledby="newsletter-title">
                <h2 id="newsletter-title">Sign up for our daily insider</h2>
                <p>Subscribe to receive a welcome email and updates from DEV@Deakin.</p>

                <form className="newsletter-form" onSubmit={handleSubscribe}>
                    <div className="newsletter-name-row">
                        <label>
                            First name
                            <input
                                type="text"
                                value={firstName}
                                onChange={(event) => setFirstName(event.target.value)}
                                maxLength={60}
                                autoComplete="given-name"
                                placeholder="First name"
                            />
                        </label>
                        <label>
                            Last name
                            <input
                                type="text"
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                                maxLength={60}
                                autoComplete="family-name"
                                placeholder="Last name"
                            />
                        </label>
                    </div>
                    <label htmlFor="newsletter-email">Email address</label>
                    <input
                        id="newsletter-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Enter your email"
                        autoComplete="email"
                        maxLength={254}
                        required
                    />
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Subscribing..." : "Subscribe"}
                    </button>
                </form>

                {message && (
                    <p className={`newsletter-message ${messageType}`} role="status" aria-live="polite">
                        {message}
                    </p>
                )}
            </section>
        </main>
    );
}

export default HomePage;
