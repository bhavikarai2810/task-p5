import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                DEV@Deakin
            </Link>

            <div className="search-container">
                <span className="search-icon">⌕</span>
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-input"
                    aria-label="Search"
                />
            </div>

            <div className="nav-right">
                <Link to="/post" className="nav-link">
                    Post
                </Link>

                <Link to="/login" className="nav-link">
                    Login
                </Link>
            </div>
        </nav>
    );
}

export default Navbar;
