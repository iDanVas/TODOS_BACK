import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TaskSchema = new Schema({
    task: { type: String, required: true },
    isDone: { type: Boolean , default : false },
    id: { type: String, default: Date.now },
    show: { type: Boolean , default : true }
}, { timestamps: true });//adds created and updated timesteps

export default model('task', TaskSchema);