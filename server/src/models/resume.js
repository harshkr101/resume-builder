import mongoose from 'mongoose';

// schema for resume

const resumeSchema = new mongoose.Schema({

    title: {
        type: String,
        //required: true,
        unique: true,
        min: 3,
        max: 50
    },
    template: {
        type: String,
        //required: true
    },
    personal: {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 100
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 100
        },
        phone: {
            type: String,
            required: true,
            min: 6,
            max: 50
        },
        email: {
            type: String,
            required: true,
            min: 3,
            max: 255
        },
        website: {
            type: String,
            min: 3,
            max: 255
        }
    },
    education: [
        {
            university: {
                type: String,
                min: 3,
                max: 100
            },
            degree: {
                type: String,
                min: 2,
                max: 100
            },
            startDate: {
                type: String,
                min: 3,
                max: 50
            },
            endDate: {
                type: String,
                min: 3,
                max: 50
            },
            gpa: {
                type: String,
                min: 1,
                max: 5
            },
        }
    ],
    experience: [
        {
            title: {
                type: String,
                min: 3,
                max: 100,
            },
            organisation: {
                type: String,
                min: 3,
                max: 100,
            },

            startDate: {
                type: String,
                min: 3,
                max: 50
            },
            endDate: {
                type: String,
                min: 3,
                max: 50
            },
            description: [
                {
                    type: String,
                    min: 3,
                    max: 100
                }
            ]

        }

    ],
    skills: [
        {
            skillName: {
                type: String,
                min: 3,
                max: 255
            },
            keywords: [{
                type: String,
                min: 3,
                max: 50
            }]
        }
    ],
    projects: [
        {
            projectName: {
                type: String,
                min: 3,
                max: 100
            },
            keywords: [{
                type: String,
                min: 2,
                max: 50
            }],
            projectDescription: [
                {
                    type: String,
                    min: 3,
                    max: 500
                }
            ],
            projectLink: {
                type: String,
                min: 3,
                max: 255
            }
        }
    ],
    achivements: [
        {
            title: {
                type: String,
                min: 2,
                max: 100,
                required: true
            },
            date: {
                type: String
            },
            organisation: {
                type: String,
                min: 1,
                max: 100
            },
            description: [
                {
                    type: String,
                    max: 100
                }
            ]

        }
    ],
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: 'User'
    },

}, { timestamps: true });

resumeSchema.index({ user: 1, title: 1 }, { unique: true });

const Resume = mongoose.model('Resume', resumeSchema);

export default Resume;