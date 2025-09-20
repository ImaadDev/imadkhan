import mongoose from 'mongoose';

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    longDescription: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    author: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    readTime: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
}, { timestamps: true });

export default mongoose.model('Blog', BlogSchema);
