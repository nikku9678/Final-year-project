import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Reference to the User model
    },
    phoneNo: {
        type: String,
        required: true,
        match: [/^\d{10}$/, 'Phone number must be 10 digits'], // Validates a 10-digit phone number
    },
    githubUrl: {
        type: String,
        required: true,
        match: [
            /^https:\/\/github\.com\/[a-zA-Z0-9-]+$/,
            'GitHub URL must be a valid GitHub profile link',
        ],
    },
    linkedinUrl: {
        type: String,
        required: true,
        match: [
            /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+$/,
            'LinkedIn URL must be a valid LinkedIn profile link',
        ],
    },
    aboutUs: {
        type: String,
        required: false,
        maxlength: 500, // Limit to 500 characters
    },
    skills: {
        type: [String], // Array of skills
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    codingProfiles: {
        codeforces: {
            type: String,
            match: [
                /^https:\/\/codeforces\.com\/profile\/[a-zA-Z0-9_]+$/,
                'Codeforces URL must be a valid Codeforces profile link',
            ],
        },
        leetcode: {
            type: String,
            match: [
                /^https:\/\/leetcode\.com\/[a-zA-Z0-9_-]+$/,
                'LeetCode URL must be a valid LeetCode profile link',
            ],
        },
        hackerrank: {
            type: String,
            match: [
                /^https:\/\/www\.hackerrank\.com\/[a-zA-Z0-9_-]+$/,
                'HackerRank URL must be a valid HackerRank profile link',
            ],
        },
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Compile and export the model
export const Profile = mongoose.model('Profile', profileSchema);
