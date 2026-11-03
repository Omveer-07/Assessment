
import { useEffect, useState } from "react";
import {
    FolderKanban,
    ListTodo,
    Clock,
    CheckCircle,
    AlertTriangle,
    Activity
} from "lucide-react";

import ActivityFeed from "../components/ActivityFeed";
import api from "../services/api";

const DASHBOARD_CARDS = [
    ["Total Projects", "totalProjects", FolderKanban, "purple"],
    ["Total Issues", "totalIssues", ListTodo, "blue"],
    ["Open Issues", "openIssues", Clock, "orange"],
    ["In Progress", "inProgressIssues", Activity, "cyan"],
    ["Completed", "completedIssues", CheckCircle, "green"],
    ["High Priority", "highPriorityIssues", AlertTriangle, "red"]
];

function Dashboard() {
    const [stats, setStats] = useState({
        totalProjects: 0,
        totalIssues: 0,
        openIssues: 0,
        inProgressIssues: 0,
        completedIssues: 0,
        highPriorityIssues: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get("/dashboard/stats");
                setStats(res.data);
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="dashboard-loading">
                Loading dashboard...
            </div>
        );
    }

    return (
        <div className="dashboard">

            <div className="dashboard-heading">
                <div>
                    <h1>Dashboard</h1>
                    <p>
                        Welcome back! Here's what's happening
                        in your workspace.
                    </p>
                </div>
            </div>

            <section className="stats-grid">
                {DASHBOARD_CARDS.map(([title, stat, Icon, color]) => {

                    return (
                        <div className="stat-card" key={title}>
                            <div className={`stat-icon ${color}`}>
                                <Icon size={21} />
                            </div>

                            <div className="stat-info">
                                <p>{title}</p>
                                <h2>{stats[stat]}</h2>
                            </div>
                        </div>
                    );
                })}
            </section>

            <section className="dashboard-bottom">
                <div className="activity-card">
                    <div className="section-heading">
                        <div>
                            <h2>Recent Activity</h2>
                            <p>Latest updates from your workspace</p>
                        </div>
                        <Activity size={21} />
                    </div>

                    <div className="activity-content">
                        <ActivityFeed />
                    </div>
                </div>

                <div className="welcome-card">
                    <div className="welcome-icon">
                        <FolderKanban size={25} />
                    </div>

                    <h2>Welcome to SprintBoard</h2>

                    <p>
                        Organize your projects, manage issues,
                        and keep track of your team's progress
                        from one place.
                    </p>
                </div>
            </section>

        </div>
    );
}

export default Dashboard;
