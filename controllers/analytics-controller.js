const Expense = require('../models/Expense');

module.exports.getMonthlyExpense = async (req, res) => {
    const userId = req.userId;
    const currentMonth = new Date().getMonth() + 1;
    const currentMonthYear = new Date().getFullYear();
    let result = {};
    try {
        for(let i=1; i<=currentMonth; i++) {
            const expenses = await Expense.find({ month: i, year: currentMonthYear, user: userId });
            const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);
            result[i] = totalExpense;
        }
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};