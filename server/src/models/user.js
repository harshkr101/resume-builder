import mongoose from 'mongoose';

//const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        //required: true,
        //unique: true,
        min: 3,
        max: 20
    },
    password: {
        type: String,
        //required: true,
        min: 3,
        max: 20
    },
    firstName: {
        type: String,
        //required: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        //required: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        //required: true,
        //unique: true,
        min: 3
    }
})
 
const User = mongoose.model('User', userSchema);

export default User;