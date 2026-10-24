import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { db } from "../firebase";

function SignupPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        setMessage("");

        if (!name || !email || !password || !confirmPassword) {
            setMessage("Please complete all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setMessage("Password must be at least 6 characters.");
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            setMessage("Please enter a valid email address.");
            return;
        }

        try {

            // Check whether the email already exists
            const usersRef = collection(db, "users");

            const q = query(
                usersRef,
                where("email", "==", email)
            );

            const existingUsers = await getDocs(q);

            if (!existingUsers.empty) {
                setMessage(
                    "An account with this email already exists."
                );
                return;
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Store the user
            await addDoc(usersRef, {
                name: name,
                email: email,
                password: hashedPassword
            });

            setMessage(
                "Account created successfully. Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1000);

        } catch (error) {

            console.error(error);
            setMessage(
                "Something went wrong. Please try again."
            );

        }
    };

    return (
        <div className="page">

            <div className="signup-page-container">

                <div className="signup-card">

                    <h2>Create a DEV@Deakin Account</h2>

                    <form onSubmit={handleSignup}>

                        <div className="form-row">
                            <label>Name*</label>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-row">
                            <label>Email*</label>

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-row">
                            <label>Password*</label>

                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-row">
                            <label>Confirm password*</label>

                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>

                        <button type="submit">
                            Create
                        </button>

                    </form>

                    {message && (
                        <p className="form-message">
                            {message}
                        </p>
                    )}

                    <p className="back-login">
                        Already have an account?
                        <Link to="/login"> Login</Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default SignupPage;