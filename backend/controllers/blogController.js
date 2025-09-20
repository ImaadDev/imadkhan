import Blog from '../models/Blog.js';

// @desc    Get all Blog entries
// @route   GET /api/blogs
// @access  Public
export const getBlogEntries = async (req, res) => {
    try {
        const blogEntries = await Blog.find();
        res.json(blogEntries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get single Blog entry by ID
// @route   GET /api/blogs/:id
// @access  Public
export const getBlogEntryById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ msg: 'Blog entry not found' });
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a Blog entry
// @route   POST /api/blogs
// @access  Public (should be private in a real app)
export const createBlogEntry = async (req, res) => {
    const { title, description, longDescription, category, tags, author, date, featured, readTime } = req.body;
    const imageUrl = req.file ? req.file.path : req.body.imageUrl; // Use uploaded file path or existing URL

    try {
        const newBlog = new Blog({
            title,
            description,
            longDescription,
            category,
            tags,
            author,
            date,
            featured,
            readTime,
            imageUrl,
        });

        const blog = await newBlog.save();
        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a Blog entry
// @route   PUT /api/blogs/:id
// @access  Public (should be private in a real app)
export const updateBlogEntry = async (req, res) => {
    const { title, description, longDescription, category, tags, author, date, featured, readTime } = req.body;
    const imageUrl = req.file ? req.file.path : req.body.imageUrl; // Use uploaded file path or existing URL

    // Build blog object
    const blogFields = {};
    if (title) blogFields.title = title;
    if (description) blogFields.description = description;
    if (longDescription) blogFields.longDescription = longDescription;
    if (category) blogFields.category = category;
    if (tags) blogFields.tags = tags;
    if (author) blogFields.author = author;
    if (date) blogFields.date = date;
    if (featured) blogFields.featured = featured;
    if (readTime) blogFields.readTime = readTime;
    blogFields.imageUrl = imageUrl; // Always update imageUrl, even if it's null/empty

    try {
        let blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ msg: 'Blog entry not found' });

        blog = await Blog.findByIdAndUpdate(
            req.params.id,
            { $set: blogFields },
            { new: true }
        );

        res.json(blog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a Blog entry
// @route   DELETE /api/blogs/:id
// @access  Public (should be private in a real app)
export const deleteBlogEntry = async (req, res) => {
    try {
        let blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ msg: 'Blog entry not found' });

        await Blog.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Blog entry removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
