
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/useTheme";

function Navbar() {
    const { theme, toggleTheme } = useTheme();

    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    return (
        <header className="navbar">

            <div>
                <h3>Workspace</h3>
                <p>Manage your projects and issues</p>
            </div>

            <div className="navbar-right">
                <button
                    className="theme-toggle"
                    type="button"
                    onClick={toggleTheme}
                    aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
                    title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
                >
                    {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                </button>

                <div className="user-info">
                    <div className="avatar">
                        {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>

                    <span>{user.name || "User"}</span>
                </div>

            </div>

        </header>
    );
}

export default Navbar;
