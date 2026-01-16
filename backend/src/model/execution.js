import mongoose from "mongoose";

const executionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    language:{
        type: String,
        required: true,
    },
    code:{
        type: String,
        required: true,
    },
    output:{
        type: String,
        output: true,
    },
}, {timestamps: true });

const Execution = mongoose.model('Execution', executionSchema);

export default Execution;