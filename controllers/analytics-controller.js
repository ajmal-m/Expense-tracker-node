const Expense = require('../models/expense-model');
const MonthlyBudget = require('../models/monthly-budget-modal');
const {months} = require('../constant/months');
const mongoose = require("mongoose");
const Budget = require("../models/budget-model");

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
};

module.exports.budgetVersesExpense =  async ( req, res ) => {
    try {
        const userId = req.userId;
        const currentMonth = new Date().getMonth() + 1;
        const currentMonthYear = new Date().getFullYear();


        const categoryComparison = await Budget.aggregate([
            {
                $match: { user: new mongoose.Types.ObjectId(userId) }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            { $unwind: "$category" },
            {
                $lookup: {
                    from: "expenses",
                    let: { categoryId: "$category._id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$category", "$$categoryId"] },
                                        { $eq: ["$user", new mongoose.Types.ObjectId(userId)] },
                                        { $eq: ["$month", currentMonth] },
                                        { $eq: ["$year", currentMonthYear] }
                                    ]
                                }
                            }
                        },
                        {
                            $group: {
                                _id: null,
                                totalExpense: { $sum: "$amount" }
                            }
                        }
                    ],
                    as: "expenses"
                }
            },
            {
                $addFields: {
                    totalExpense: { $ifNull: [{ $arrayElemAt: ["$expenses.totalExpense", 0] }, 0] },
                    budgetedAmount: "$amount"
                }
            },
            {
                $project: {
                    _id: 0,
                    categoryName: "$category.name",
                    budgetedAmount: 1,
                    totalExpense: 1,
                    status: {
                        $cond: [
                            { $gt: ["$totalExpense", "$budgetedAmount"] },
                            "Over Budget",
                            "Under Budget"
                        ]
                    }
                }
            }
        ]);



       res.status(200).json(categoryComparison);


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports.getCurrentMonthExpense = async (req, res) => {
    try {
        const userId = req.userId;
        const currentMonth = new Date().getMonth() + 1;
        const currentMonthYear = new Date().getFullYear();

        const expense = await Expense.aggregate([
            {
                $match:{
                    user: new mongoose.Types.ObjectId(userId), 
                    month: currentMonth,
                    year: currentMonthYear
                }
            },
            {
                $group:{
                    _id:null,
                    expense:{ $sum : "$amount"}
                }
            },
            {
                $project: {
                    _id: 0,
                    expense: 1
                }
            }
        ]);

       const monthlyBudget = await MonthlyBudget.findOne(
            { user: userId, month: currentMonth, year: currentMonthYear },
            "amount"
        );

        const currentMonthTotalExpense = expense[0]?.expense || 0;
        const currentMonthBudget = monthlyBudget.amount;
        const spended = Number((currentMonthTotalExpense/currentMonthBudget)*100, 2).toFixed(1);
        const remains = currentMonthBudget - currentMonthTotalExpense ;
        const remainPercentage = Number((remains/currentMonthBudget)*100).toFixed(1);

        res.status(200).json({
            expense: currentMonthTotalExpense,
            budget: currentMonthBudget,
            spended: spended,
            remains: remains,
            remainPercentage
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};