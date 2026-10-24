import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { db } from "../firebase";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        setMessage("");

        if (!email || !password) {
            setMessage("Please enter your email and password.");
            return;
        }

        try {

            const usersRef = collection(db, "users");

            const q = query(
                usersRef,
                where("email", "==", email)
            );

            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                setMessage(
                    "Account not found. Please try again or sign-up for a free account."
                );
                return;
            }

            const userData = querySnapshot.docs[0].data();

            const passwordCorrect = await bcrypt.compare(
                password,
                userData.password
            );

            if (passwordCorrect) {

                setMessage("Login successful.");

                setTimeout(() => {
                    navigate("/");
                }, 500);

            } else {

                setMessage(
                    "Incorrect password. Please try again or sign-up for a free account."
                );

            }

        } catch (error) {

            console.error(error);
            setMessage("Something went wrong. Please try again.");

        }
    };

    return (
        <div className="page">

            <div className="login-container">

                <div className="login-card">

                    <Link to="/signup" className="signup-link">
                        Sign up
                    </Link>

                    <form onSubmit={handleLogin}>

                        <label>Your email</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <label>Your password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type="submit">
                            Login
                        </button>

                    </form>

                    {message && (
                        <p className="form-message">
                            {message}
                        </p>
                    )}

                </div>

            </div>

        </div>
    );
}

export default LoginPage;