
import { useEffect, useState } from "react";
import ActivityFeed from "../components/ActivityFeed";
import {
    FolderKanban,
    ListTodo,
    Clock,
    CheckCircle,
    AlertTriangle
} from "lucide-react";

import api from "../services/api";

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
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();

    }, []);

    const cards = [
        {
            title: "Total Projects",
            value: stats.totalProjects,
            icon: FolderKanban
        },
        {
            title: "Total Issues",
            value: stats.totalIssues,
            icon: ListTodo
        },
        {
            title: "Open Issues",
            value: stats.openIssues,
            icon: Clock
        },
        {
            title: "In Progress",
            value: stats.inProgressIssues,
            icon: AlertTriangle
        },
        {
            title: "Completed",
            value: stats.completedIssues,
            icon: CheckCircle
        },
        {
            title: "High Priority",
            value: stats.highPriorityIssues,
            icon: AlertTriangle
        }
    ];

    if (loading) return <p>Loading dashboard...</p>;

    return (
        <div className="dashboard">

            <div className="page-heading">
                <div>
                    <h1>Dashboard</h1>
                    <p>Here's what's happening in your workspace.</p>
                </div>
            </div>

            <div className="stats-grid">

                {cards.map((card, index) => {
                    const Icon = card.icon;

                    return (
                        <div className="stat-card" key={index}>

                            <div className="stat-icon">
                                <Icon size={22} />
                            </div>

                            <p>{card.title}</p>

                            <h2>{card.value}</h2>

                        </div>
                    );
                })}

            </div>

            <div className="welcome-card">
                <h2>Welcome to SprintBoard</h2>
                <p>
                    Organize your projects, track issues,
                    and monitor your team's progress.
                </p>
            </div>

        </div>
    );
    
}

export default Dashboard;
<ActivityFeed />