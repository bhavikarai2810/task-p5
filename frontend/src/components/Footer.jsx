import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-section">
                <h3>DEV@Deakin</h3>
                <Link to="/about">About Deakin</Link>
            </div>

            <div className="footer-section">
                <h3>Follow Us</h3>

                <div className="social-links">
                    <a href="https://www.facebook.com" target="_blank">
                        Facebook
                    </a>

                    <a href="https://twitter.com" target="_blank">
                        Twitter
                    </a>

                    <a href="https://www.instagram.com" target="_blank">
                        Instagram
                    </a>
                </div>
            </div>

        </footer>
    );
}

export default Footer;