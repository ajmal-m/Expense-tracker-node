const MonthlyBudget = require("../models/monthly-budget-modal");

module.exports.getMonthlyBudget = async (req, res) => {
    const userId = req.userId;
    const {month, year} = req.query;
    try {
        console.log(month, year, userId);
        const monthlyBudgets = await MonthlyBudget.find({ user: userId, month, year});
        if (!monthlyBudgets || monthlyBudgets.length === 0) {
            return res.status(404).json({ message: "Monthly budget not found" });
        }
        return res.status(200).json(monthlyBudgets);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports.createMonthlyBudget = async (req, res) => {
    const userId = req.userId;
    const { month, year, amount } = req.body;
    try {
        const newMonthlyBudget = new MonthlyBudget({
            user: userId,
            month,
            year,
            amount
        });
        await newMonthlyBudget.save();
        return res.status(201).json(newMonthlyBudget);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}

module.exports.updateMonthlyBudget = async (req, res) => {
    const userId = req.userId;
    const { id } = req.params;
    const { month, year, amount } = req.body;
    try {
        const monthlyBudget = await MonthlyBudget.findOne({ _id: id, user: userId });
        if (!monthlyBudget) {
            return res.status(404).json({ message: 'Monthly budget not found' });
        }   
        monthlyBudget.month = month;
        monthlyBudget.year = year;
        monthlyBudget.amount = amount;
        await monthlyBudget.save();
        return res.status(200).json(monthlyBudget);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
}
