
import mongoose from "mongoose";

import Activity from "../models/Activity.js";
import Issue from "../models/Issue.js";
import Project from "../models/Project.js";

export const getRecentActivities = async (req, res) => {
    try {
        const { project } = req.query;

        let projectIds;

        // If project ID is provided
        if (project) {

            if (!mongoose.isValidObjectId(project)) {
                return res.status(400).json({
                    message: "Invalid project ID"
                });
            }

            const selectedProject = await Project.findOne({
                _id: project,
                createdBy: req.user.id
            });

            if (!selectedProject) {
                return res.status(404).json({
                    message: "Project not found"
                });
            }

            projectIds = [selectedProject._id];

        } else {

            // Get all projects belonging to user
            projectIds = await Project.find({
                createdBy: req.user.id
            }).distinct("_id");

        }

        // Find issues belonging to these projects
        const issueIds = await Issue.find({
            projectId: { $in: projectIds }
        }).distinct("_id");

        // Fetch recent activities
        const activities = await Activity.find({
            userId: req.user.id,
            issueId: { $in: issueIds }
        })
            .populate("userId", "name")
            .populate("issueId", "title")
            .sort({ createdAt: -1 })
            .limit(10);

        res.status(200).json(activities);

    } catch (error) {
        res.status(500).json({
            message: "Unable to fetch activities"
        });
    }
};
