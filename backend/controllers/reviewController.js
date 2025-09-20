import Review from '../models/Review.js';

// @desc    Get all Review entries
// @route   GET /api/reviews
// @access  Public
export const getReviewEntries = async (req, res) => {
    try {
        const reviewEntries = await Review.find();
        res.json(reviewEntries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a Review entry
// @route   POST /api/reviews
// @access  Public (should be private in a real app)
export const createReviewEntry = async (req, res) => {
    const { reviewerName, reviewContent, rating, date } = req.body;

    try {
        const newReview = new Review({
            reviewerName,
            reviewContent,
            rating,
            date,
        });

        const review = await newReview.save();
        res.json(review);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a Review entry
// @route   PUT /api/reviews/:id
// @access  Public (should be private in a real app)
export const updateReviewEntry = async (req, res) => {
    const { reviewerName, reviewContent, rating, date } = req.body;

    const reviewFields = {};
    if (reviewerName) reviewFields.reviewerName = reviewerName;
    if (reviewContent) reviewFields.reviewContent = reviewContent;
    if (rating) reviewFields.rating = rating;
    if (date) reviewFields.date = date;

    try {
        let review = await Review.findById(req.params.id);

        if (!review) return res.status(404).json({ msg: 'Review entry not found' });

        review = await Review.findByIdAndUpdate(
            req.params.id,
            { $set: reviewFields },
            { new: true }
        );

        res.json(review);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a Review entry
// @route   DELETE /api/reviews/:id
// @access  Public (should be private in a real app)
export const deleteReviewEntry = async (req, res) => {
    try {
        let review = await Review.findById(req.params.id);

        if (!review) return res.status(404).json({ msg: 'Review entry not found' });

        await Review.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Review entry removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
