import mongoose from 'mongoose';



const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 55
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 50
    },
    firstName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    lastName: {
        type: String,
        required: true,
        min: 2,
        max: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max:255
    }
})
 
const User = mongoose.model('User', userSchema);

export default User;