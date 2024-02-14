import { Schema, model } from "mongoose";

const ChannelSchema = new Schema({
    name: {type: String, unique: true, required: true},
});

export default model('Channel', ChannelSchema);