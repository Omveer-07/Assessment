
import Project from "../models/Project.js";

// CREATE PROJECT
export const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Project name is required"
            });
        }

        const project = await Project.create({
            name: name.trim(),
            description,
            createdBy: req.user.id
        });

        res.status(201).json({
            message: "Project created successfully",
            project
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET ALL PROJECTS
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            createdBy: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json(projects);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// GET SINGLE PROJECT
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.findOne({
            _id: req.params.id,
            createdBy: req.user.id
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json(project);

    } catch (error) {
        res.status(400).json({
            message: "Invalid project ID"
        });
    }
};


// UPDATE PROJECT
export const updateProject = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (name !== undefined && !name.trim()) {
            return res.status(400).json({
                message: "Project name cannot be empty"
            });
        }

        const project = await Project.findOneAndUpdate(
            {
                _id: req.params.id,
                createdBy: req.user.id
            },
            {
                $set: {
                    ...(name !== undefined && { name: name.trim() }),
                    ...(description !== undefined && { description })
                }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        res.status(200).json({
            message: "Project updated successfully",
            project
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};


// DELETE PROJECT
export const deleteProject = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user.id
        });

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // Delete all issues belonging to this project
        const { default: Issue } = await import("../models/Issue.js");

        await Issue.deleteMany({
            projectId: project._id
        });

        res.status(200).json({
            message: "Project and its issues deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
