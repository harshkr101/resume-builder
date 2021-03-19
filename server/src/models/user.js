import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max:255
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 255
    },
},{timestamps:true})
 
const User = mongoose.model('User', userSchema);

export default User;