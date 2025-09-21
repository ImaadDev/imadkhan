import Project from '../models/Project.js';

// @desc    Get all Project entries
// @route   GET /api/projects
// @access  Public
export const getProjectEntries = async (req, res) => {
    try {
        const projectEntries = await Project.find();
        res.json(projectEntries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get single Project entry by ID
// @route   GET /api/projects/:id
// @access  Public
export const getProjectEntryById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ msg: 'Project entry not found' });
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a Project entry
// @route   POST /api/projects
// @access  Public (should be private in a real app)
export const createProjectEntry = async (req, res) => {
    const { title, description, projectUrl, githubUrl, tags, category } = req.body;
    const imageUrl = req.file ? req.file.path : req.body.imageUrl; // Use uploaded file path or existing URL

    try {
        const newProject = new Project({
            title,
            description,
            imageUrl,
            projectUrl,
            githubUrl,
            tags: Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()),
            category,
        });

        const project = await newProject.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a Project entry
// @route   PUT /api/projects/:id
// @access  Public (should be private in a real app)
export const updateProjectEntry = async (req, res) => {
    const { title, description, projectUrl, githubUrl, tags, category } = req.body;
    const imageUrl = req.file ? req.file.path : req.body.imageUrl; // Use uploaded file path or existing URL

    // Build project object
    const projectFields = {};
    if (title) projectFields.title = title;
    if (description) projectFields.description = description;
    projectFields.imageUrl = imageUrl; // Always update imageUrl, even if it's null/empty
    if (projectUrl) projectFields.projectUrl = projectUrl;
    if (githubUrl) projectFields.githubUrl = githubUrl;
    if (tags) projectFields.tags = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());
    if (category) projectFields.category = category;

    try {
        let project = await Project.findById(req.params.id);

        if (!project) return res.status(404).json({ msg: 'Project entry not found' });

        project = await Project.findByIdAndUpdate(
            req.params.id,
            { $set: projectFields },
            { new: true }
        );

        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a Project entry
// @route   DELETE /api/projects/:id
// @access  Public (should be private in a real app)
export const deleteProjectEntry = async (req, res) => {
    try {
        let project = await Project.findById(req.params.id);

        if (!project) return res.status(404).json({ msg: 'Project entry not found' });

        await Project.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Project entry removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
