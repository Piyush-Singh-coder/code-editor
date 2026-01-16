import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
}, {timestamps: true });

const snippetSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title:{
        type: String,
        required: true,
        trim: true,
    },
    language:{
        type: String,
        required: true,
    },
    code:{
        type: String,
        required: true,
    },
    stars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

    comments: [commentSchema],

}, {timestamps: true });

const Snippet = mongoose.model('Snippet', snippetSchema);

export default Snippet;