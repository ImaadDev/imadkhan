import mongoose from 'mongoose';

const TechnologySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    iconUrl: {
        type: String,
    },
    // Add more fields as per your Technologies.jsx component
}, { timestamps: true });

export default mongoose.model('Technology', TechnologySchema);
