import mongoose from 'mongoose';

const ProjectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    projectUrl: {
        type: String,
    },
    githubUrl: {
        type: String,
    },
    tags: [
        {
            type: String,
        },
    ],
    // Add more fields as per your Projects.jsx and ProjectsPage.jsx components
}, { timestamps: true });

export default mongoose.model('Project', ProjectSchema);
