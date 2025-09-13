const mongoose = require("mongoose");

const MonthlyBudgetSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    month: {
        type: Number,
        required: true,
        min:1,
        max:12
    },
    year:{
        type:Number,
        required:true
    },
    amount: {
        type: Number,
        required: true
    },
    
}, { timestamps: true });

module.exports = mongoose.model("MonthlyBudget", MonthlyBudgetSchema);
