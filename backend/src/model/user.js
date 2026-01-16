import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,

    },
    authProvider: {
        type: String,
        default: 'local',
    }
    ,
    isVerified:{
        type: Boolean,
        default: false,
    }
},{timestamps: true });


const User = mongoose.model('User', userSchema);

export default User;