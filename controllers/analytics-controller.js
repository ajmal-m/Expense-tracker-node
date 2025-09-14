const Expense = require('../models/expense-model');
const {months} = require('../constant/months');
const mongoose = require("mongoose");

module.exports.getMonthlyExpense = async (req, res) => {
    const userId = req.userId;
    const currentMonth = new Date().getMonth() + 1;
    const currentMonthYear = new Date().getFullYear();
    try {
        const expenses = await Expense.aggregate([
            { 
                $match: { 
                    user: new mongoose.Types.ObjectId(userId), 
                    year: currentMonthYear, 
                    month: { $lte: currentMonth } 
                } 
            },
            {
                $group: {
                    _id: "$month",
                    totalExpense: { $sum: "$amount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const result={};

        for(let expense of expenses){
            result[months[expense._id]] = expense.totalExpense;
        }
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports.getMonthlyCategoryWiseExpense = async(req, res) => {
    const userId = req.userId;
    const currentMonth = new Date().getMonth() + 1;
    const currentMonthYear = new Date().getFullYear();

    try {
        const categoryExpense = await Expense.aggregate([
            {
                $match:{
                    user: new mongoose.Types.ObjectId(userId), 
                    month: currentMonth,
                    year: currentMonthYear
                },
            },
            {
                $group:{
                    _id:"$category",
                    totalExpense: { $sum: "$amount" }
                }
            },
             {
                $lookup: {
                    from: "categories",
                    localField: "_id",  
                    foreignField: "_id",
                    as: "category"
                }
            },
             {
                $unwind: "$category" 
            },
            {
                $project:{
                     _id: 0,
                    categoryName: "$category.name",
                    totalExpense: 1
                }
            }
        ]);


        const expenses = categoryExpense.map(e => e.totalExpense);
        const categoryNames = categoryExpense.map(e => e.categoryName);

        res.status(200).json({
            expenses: expenses,
            categoryNames: categoryNames
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}