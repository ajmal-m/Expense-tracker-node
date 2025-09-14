const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    day:{
        type: Number,
        required: true,
        min: 1,
        max: 31
    },
    month:{
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    year:{
        type: Number,
        required: true,
    },
    notes:{
        type: String,
        required: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['Cards', 'Cash', 'UPI', 'Payment Later'],
        required: false
    }
},{ timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
