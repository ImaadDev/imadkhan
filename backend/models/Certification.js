import mongoose from 'mongoose';

const CertificationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    issuingOrganization: {
        type: String,
        required: true,
    },
    issueDate: {
        type: Date,
    },
    expirationDate: {
        type: Date,
    },
    credentialID: {
        type: String,
    },
    credentialURL: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    // Add more fields as per your Certifications.jsx and CertificationsPage.jsx components
}, { timestamps: true });

export default mongoose.model('Certification', CertificationSchema);
