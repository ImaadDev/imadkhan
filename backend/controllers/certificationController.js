import Certification from '../models/Certification.js';

// @desc    Get all Certification entries
// @route   GET /api/certifications
// @access  Public
export const getCertificationEntries = async (req, res) => {
    try {
        const certificationEntries = await Certification.find();
        res.json(certificationEntries);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Get single Certification entry by ID
// @route   GET /api/certifications/:id
// @access  Public
export const getCertificationEntryById = async (req, res) => {
    try {
        const certification = await Certification.findById(req.params.id);
        if (!certification) return res.status(404).json({ msg: 'Certification entry not found' });
        res.json(certification);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Create a Certification entry
// @route   POST /api/certifications
// @access  Public (should be private in a real app)
export const createCertificationEntry = async (req, res) => {
    const { name, issuingOrganization, issueDate, expirationDate, credentialID, credentialURL } = req.body;
    const imageUrl = req.file ? req.file.path : req.body.imageUrl; // Use uploaded file path or existing URL

    try {
        const newCertification = new Certification({
            name,
            issuingOrganization,
            issueDate,
            expirationDate,
            credentialID,
            credentialURL,
            imageUrl,
        });

        const certification = await newCertification.save();
        res.json(certification);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a Certification entry
// @route   PUT /api/certifications/:id
// @access  Public (should be private in a real app)
export const updateCertificationEntry = async (req, res) => {
    const { name, issuingOrganization, issueDate, expirationDate, credentialID, credentialURL } = req.body;
    const imageUrl = req.file ? req.file.path : req.body.imageUrl; // Use uploaded file path or existing URL

    // Build certification object
    const certificationFields = {};
    if (name) certificationFields.name = name;
    if (issuingOrganization) certificationFields.issuingOrganization = issuingOrganization;
    if (issueDate) certificationFields.issueDate = issueDate;
    if (expirationDate) certificationFields.expirationDate = expirationDate;
    if (credentialID) certificationFields.credentialID = credentialID;
    if (credentialURL) certificationFields.credentialURL = credentialURL;
    certificationFields.imageUrl = imageUrl; // Always update imageUrl, even if it's null/empty

    try {
        let certification = await Certification.findById(req.params.id);

        if (!certification) return res.status(404).json({ msg: 'Certification entry not found' });

        certification = await Certification.findByIdAndUpdate(
            req.params.id,
            { $set: certificationFields },
            { new: true }
        );

        res.json(certification);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a Certification entry
// @route   DELETE /api/certifications/:id
// @access  Public (should be private in a real app)
export const deleteCertificationEntry = async (req, res) => {
    try {
        let certification = await Certification.findById(req.params.id);

        if (!certification) return res.status(404).json({ msg: 'Certification entry not found' });

        await Certification.findByIdAndDelete(req.params.id);

        res.json({ msg: 'Certification entry removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};
