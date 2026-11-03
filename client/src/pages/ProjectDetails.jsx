
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

function ProjectDetails() {

    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [issues, setIssues] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [error, setError] = useState("");
    const [activities, setActivities] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const [
                projectRes,
                issueRes,
                activityRes
            ] = await Promise.all([

                api.get(`/projects/${id}`),

                api.get(`/issues?project=${id}`),

                api.get(`/activities?project=${id}`)

            ]);

            setProject(projectRes.data);
            setIssues(issueRes.data);
            setActivities(activityRes.data);

            setError("");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Unable to load project"
            );
        }
    }, [id]);

    useEffect(() => {
        queueMicrotask(fetchData);
    }, [fetchData]);

    const createIssue = async (e) => {
        e.preventDefault();

        try {
            await api.post("/issues", {
                title,
                description,
                priority,
                projectId: id
            });

            setTitle("");
            setDescription("");

            fetchData();

        } catch (error) {
            setError(error.response?.data?.message || "Issue creation failed");
        }
    };

    const updateStatus = async (issueId, status) => {
        try {
            await api.put(`/issues/${issueId}`, { status });
            fetchData();
        } catch {
            setError("Unable to update issue");
        }
    };

    const deleteIssue = async (issueId) => {

        if (!window.confirm("Delete this issue?")) return;

        try {
            await api.delete(`/issues/${issueId}`);
            fetchData();
        } catch {
            setError("Unable to delete issue");
        }
    };

    if (error && !project) return <p>{error}</p>;

    if (!project) return <p>Loading project...</p>;

    return (
        <div>

            <h1>{project.name}</h1>
            <p>{project.description}</p>

            {error && <p className="error">{error}</p>}

            <h2>Create Issue</h2>

            <form className="project-form" onSubmit={createIssue}>

                <input
                    placeholder="Issue title"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />

                <input
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                <select
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>

                <button type="submit">Create Issue</button>

            </form>

            <h2>Project Issues</h2>

            <div className="issues-list">

                {issues.map(issue => (

                    <div className="issue-card" key={issue._id}>

                        <div>
                            <h3>{issue.title}</h3>
                            <p>{issue.description}</p>
                            <span className={`priority ${issue.priority}`}>
                                {issue.priority}
                            </span>
                        </div>

                        <select
                            value={issue.status}
                            onChange={e =>
                                updateStatus(issue._id, e.target.value)
                            }
                        >
                            <option value="todo">To Do</option>
                            <option value="in-progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>

                        <button onClick={() => deleteIssue(issue._id)}>
                            Delete
                        </button>

                    </div>

                ))}

            </div>

            {issues.length === 0 && <p>No issues in this project.</p>}


            {/* RECENT ACTIVITY */}

            <div className="activity-section">

                <div className="activity-heading">
                    <div>
                        <h2>Recent Activity</h2>
                        <p>Latest updates in this project</p>
                    </div>
                </div>

                {activities.length === 0 ? (

                    <p className="empty-activity">
                        No recent activity yet.
                    </p>

                ) : (

                    <div className="activity-timeline">

                        {activities.map(activity => (

                            <div
                                className="activity-item"
                                key={activity._id}
                            >

                                <div className="activity-dot"></div>

                                <div className="activity-content">

                                    <h4>
                                        {activity.userId?.name || "User"}
                                    </h4>

                                    <p>{activity.action}</p>

                                    <small>
                                        Issue: {activity.issueId?.title || "Unavailable"}
                                    </small>

                                    <small>
                                        {new Date(
                                            activity.createdAt
                                        ).toLocaleString()}
                                    </small>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>


        </div>
    );
}

export default ProjectDetails;
