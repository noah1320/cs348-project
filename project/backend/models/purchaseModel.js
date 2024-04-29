import mongoose from "mongoose"

const purchaseSchema = mongoose.Schema(
    {
        transaction_id: {
            type: Number,
        },
        purchased_date: {
            type: Date,
        },
        price: {
            type: Number,
        },
        game_id: {
            type: Number,
        },  
        user_id: {
            type: String,
        },
    }
);

export const Purchase = mongoose.model('transaction', purchaseSchema);