import mongoose from "mongoose"

const gameSchema = mongoose.Schema(
    {
        game_id: {
            type: Number,
        },
        title: {
            type: String,
        },
        company: {
            type: String,
        },
        published_year: {
            type: Number,
        },  
        price: {
            type: Number,
        },
    }
);

export const Game = mongoose.model('game', gameSchema);