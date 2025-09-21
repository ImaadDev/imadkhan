import Technology from '../models/Technology.js';

// @desc    Get all Technology entries
// @route   GET /api/technologies
// @access  Public
export const getTechnologyEntries = async (req, res) => {
    try {
        const technologyEntries = await Technology.find();
        res.json(technologyEntries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a Technology entry
// @route   POST /api/technologies
// @access  Public (should be private in a real app)
export const createTechnologyEntry = async (req, res) => {
    const { name, featured } = req.body;
    const iconUrl = req.file ? req.file.path : req.body.iconUrl; // Use uploaded file path or existing URL

    try {
        const newTechnology = new Technology({
            name,
            iconUrl,
            featured,
        });

        const technology = await newTechnology.save();
        res.json(technology);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a Technology entry
// @route   PUT /api/technologies/:id
// @access  Public (should be private in a real app)
export const updateTechnologyEntry = async (req, res) => {
    const { name, featured } = req.body;
    const iconUrl = req.file ? req.file.path : req.body.iconUrl; // Use uploaded file path or existing URL

    // Build technology object
    const technologyFields = {};
    if (name) technologyFields.name = name;
    if (typeof featured === 'boolean') technologyFields.featured = featured; // Only update if explicitly provided
    technologyFields.iconUrl = iconUrl; // Always update iconUrl, even if it's null/empty

    try {
        let technology = await Technology.findById(req.params.id);

        if (!technology) return res.status(404).json({ msg: 'Technology entry not found' });

        technology = await Technology.findByIdAndUpdate(
            req.params.id,
            { $set: technologyFields },
            { new: true }
        );

        res.json(technology);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a Technology entry
// @route   DELETE /api/technologies/:id
// @access  Public (should be private in a real app)
export const deleteTechnologyEntry = async (req, res) => {
    try {
        let technology = await Technology.findById(req.params.id);

        if (!technology) return res.status(404).json({ msg: 'Technology entry not found' });

        await Technology.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Technology entry removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
