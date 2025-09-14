const Expense = require('../models/expense-model');

module.exports.getExpenses = async (req, res) => {
    const userId = req.userId;
    const { page, limit } = req.params;
    try {
        const expenses = await Expense.find({ user: userId }).skip((page - 1) * limit).limit(parseInt(limit)).populate('category');
        res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.createExpense = async (req, res) => {
    const { amount, day, month, year, notes, category, paymentMethod } = req.body;
    const userId = req.userId;

    try {
        const newExpense = new Expense({
            amount,
            day,
            month,
            year,
            notes,
            category,
            paymentMethod,
            user: userId
        });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.updateExpense = async (req, res) => {
    const { id } = req.params;
    const { amount, date, notes, category, paymentMethod } = req.body;
    try {
        const updatedExpense = await Expense.findOneAndUpdate(
            { _id: id },
            { amount, date, notes, category, paymentMethod },
            { new: true }
        );
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json(updatedExpense);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedExpense = await Expense.findOneAndDelete({ _id: id });
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};