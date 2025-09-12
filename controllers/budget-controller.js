const Budget = require('../models/budget-model');

module.exports.getBudgets = async (req, res) => {
    const userId = req.userId;
    try {
        const budgets = await Budget.find({ user: userId }).populate('category');
        res.status(200).json(budgets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports.createBudget = async (req, res) => {
    const { amount, category } = req.body;
    const userId = req.userId;
    try {
        const newBudget = new Budget({ amount, category, user: userId });
        await newBudget.save();
        const populatedBudget = await Budget.findById(newBudget._id).populate("category");
        res.status(201).json(populatedBudget);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.deleteBudget = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBudget = await Budget.findOneAndDelete({ _id: id });
        if (!deletedBudget) {
            return res.status(404).json({ message: 'Budget not found' });
        }
        res.status(200).json({ message: 'Budget deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
