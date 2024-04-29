import mongoose from "mongoose"

const dlcSchema = mongoose.Schema(
    {
        dlc_id:{
            type: String,
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
        },
        game_id: {
            type: String,
        },
    }
);

export const Dlc = mongoose.model('dlc', dlcSchema);