import mongoose from 'mongoose';

const ReviewSchema = mongoose.Schema({
    reviewerName: {
        type: String,
        required: true,
    },
    reviewContent: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    // Add more fields as per your Reviews.jsx component
}, { timestamps: true });

export default mongoose.model('Review', ReviewSchema);
