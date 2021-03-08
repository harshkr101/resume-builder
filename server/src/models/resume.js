import mongoose from 'mongoose';

// schema for resume

const resumeSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique: true,
        min:3,
        max:50
    },
    template: {
        type: String,
        required: true
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
        phone:{
            type: String,
            required:true,
            min: 6,
            max: 50
        },
        email: {
            type: String,
            required: true,
            min: 3,
            max: 255
        },
        website:{
            type: String,
            min: 3,
            max: 255
        }
    },
    skills:[
        {
            skillName:{
                type:String,
                min:3,
                max:255
            },
            keywords:[{
                type: String,
                min: 3,
                max: 50
            }]
        }
    ],
    projects:[
        {
            projectName:{
                type: String,
                min:3,
                max:100
            },
            keywords:[{
                type:String,
                min:2,
                max:50
            }],
            projectDescription:{
                type: String,
                min:3,
                max: 500
            },
            projectLink:{
                type: String,
                min:3,
                max:255
            }
        }
    ],
    achivements:[
        {
            title:{
                type: String,
                min:2,
                max:100,
                required:true
            },
            date:{
                type:String
            },
            organisation:{
                type: String,
                min:1,
                max:100
            }

        }
    ],

},{timestamps:true});

const Resume  = mongoose.model('Resume',resumeSchema);

export default Resume;