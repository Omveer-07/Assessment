
import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    FolderKanban,
    ListTodo,
    LogOut,
    Zap
} from "lucide-react";

const SIDEBAR_LINKS = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Projects",
        path: "/projects",
        icon: FolderKanban
    },
    {
        name: "Issues",
        path: "/issues",
        icon: ListTodo
    }
];

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <aside className="sidebar" aria-label="Primary navigation">

            <div className="brand">
                <Zap size={24} aria-hidden="true" />
                <h2 className="brand-name">SprintBoard</h2>
            </div>

            <p className="nav-label">WORKSPACE</p>

            <nav>
                {SIDEBAR_LINKS.map(link => {
                    const Icon = link.icon;

                    return (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            title={link.name}
                            className={({ isActive }) =>
                                isActive ? "nav-link active" : "nav-link"
                            }
                        >
                            <Icon size={19} aria-hidden="true" />
                            <span className="nav-text">{link.name}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <button
                className="logout-btn"
                type="button"
                onClick={logout}
                title="Logout"
                aria-label="Logout"
            >
                <LogOut size={19} aria-hidden="true" />
                <span className="nav-text">Logout</span>
            </button>

        </aside>
    );
}

export default Sidebar;
