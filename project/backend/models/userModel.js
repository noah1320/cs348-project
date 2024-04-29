import mongoose from "mongoose"

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        user_id: {
            type: Number,
        },
    }
);

export const User = mongoose.model('User', userSchema);