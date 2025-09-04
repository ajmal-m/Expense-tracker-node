const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
        default: null
    },
    amount: {
        type: Number,
        required: true
    },
    
}, { timestamps: true });

module.exports = mongoose.model("Budget", budgetSchema);
